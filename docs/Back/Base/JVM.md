---
title: JVM
date: 2024-03-05 10:06:47
permalink: /pages/d0b82f/
---
# JVM

## Java类加载机制

### 类加载过程

当我们用`java`命令运行某个类的`main`函数启动程序时，首先需要通过**类加载器**把主类加载到`JVM`。

```java
package com.tuling.jvm;

public class Math {
    public static final int initData = 666;
    public static User user = new User();

    public int compute() {  //一个方法对应一块栈帧内存区域
        int a = 1;
        int b = 2;
        int c = (a + b) * 10;
        return c;
    }

    public static void main(String[] args) {
        Math math = new Math();
        math.compute();
    }

}
```

**通过Java命令执行代码的大体流程如下：**

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/102280.png)

其中loadClass的类加载过程有如下几步：

**加载 >> 验证 >> 准备 >> 解析 >> 初始化 >>** 使用 >> 卸载

- 加载：在硬盘上查找并通过IO读入字节码文件，使用到类时才会加载，例如调用类的`main()`方法，new对象等等，在加载阶段会在内存中生成一个**代表这个类的`java.lang.Class`对象**，作为方法区这个类的各种数据的访问入口
- 验证：校验字节码文件的正确性
- 准备：给类的静态变量分配内存，并赋予默认值
- 解析：将**符号引用**替换为直接引用，该阶段会把一些静态方法(符号引用，比如`main()`方法)替换为指向数据所存内存的指针或句柄等(直接引用)，这是所谓的**静态链接**过程(类加载期间完成)，**动态链接**是在程序运行期间完成的将符号引用替换为直接引用
- **初始化**：对类的静态变量初始化为指定的值，执行静态代码块

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/102279.png)

类被加载到方法区中后主要包含 **运行时常量池、类型信息、字段信息、方法信息、类加载器的引用、对应class实例的引用**等信息。

**类加载器的引用**：这个类到类加载器实例的引用

**对应class实例的引用**：类加载器在加载类信息放到方法区中后，会创建一个对应的Class 类型的对象实例放到堆`(Heap)`中, 作为开发人员访问方法区中类定义的入口和切入点。

> 主类在运行过程中如果使用到其它类，会逐步加载这些类。

jar包或war包里的类不是一次性全部加载的，是使用到时才加载。

```java
public class TestDynamicLoad {

    static {
        System.out.println("*************load TestDynamicLoad************");
    }

    public static void main(String[] args) {
        new A();
        System.out.println("*************load test************");
        B b = null;  //B不会加载，除非这里执行 new B()
    }
}

class A {
    static {
        System.out.println("*************load A************");
    }

    public A() {
        System.out.println("*************initial A************");
    }
}

class B {
    static {
        System.out.println("*************load B************");
    }

    public B() {
        System.out.println("*************initial B************");
    }
}

运行结果：
*************load TestDynamicLoad************
*************load A************
*************initial A************
*************load test************
```

**类加载器**

上面的类加载过程主要是通过类加载器来实现的，Java里有如下几种类加载器

- 引导类加载器：负责加载支撑JVM运行的位于JRE的lib目录下的**核心类库**，比如`rt.jar、charsets.jar`等
- 扩展类加载器：负责加载支撑JVM运行的位于JRE的lib目录下的**ext扩展**目录中的`JAR`类包
- 应用程序类加载器：负责加载`ClassPath`路径下的类包，主要就是加载你自己写的那些类
- 自定义加载器：负责加载用户自定义路径下的类包

看一个**类加载器**示例：

```java
public class TestJDKClassLoader {

    public static void main(String[] args) {
        System.out.println(String.class.getClassLoader());
        System.out.println(com.sun.crypto.provider.DESKeyFactory.class.getClassLoader().getClass().getName());
        System.out.println(TestJDKClassLoader.class.getClassLoader().getClass().getName());

        System.out.println();
        ClassLoader appClassLoader = ClassLoader.getSystemClassLoader();
        ClassLoader extClassloader = appClassLoader.getParent();
        ClassLoader bootstrapLoader = extClassloader.getParent();
        System.out.println("the bootstrapLoader : " + bootstrapLoader);
        System.out.println("the extClassloader : " + extClassloader);
        System.out.println("the appClassLoader : " + appClassLoader);

        System.out.println();
        System.out.println("bootstrapLoader加载以下文件：");
        URL[] urls = Launcher.getBootstrapClassPath().getURLs();
        for (int i = 0; i < urls.length; i++) {
            System.out.println(urls[i]);
        }

        System.out.println();
        System.out.println("extClassloader加载以下文件：");
        System.out.println(System.getProperty("java.ext.dirs"));

        System.out.println();
        System.out.println("appClassLoader加载以下文件：");
        System.out.println(System.getProperty("java.class.path"));

    }
}

运行结果：
null
sun.misc.Launcher$ExtClassLoader
sun.misc.Launcher$AppClassLoader

the bootstrapLoader : null
the extClassloader : sun.misc.Launcher$ExtClassLoader@3764951d
the appClassLoader : sun.misc.Launcher$AppClassLoader@14dad5dc

bootstrapLoader加载以下文件：
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/resources.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/rt.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/sunrsasign.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/jsse.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/jce.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/charsets.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/lib/jfr.jar
file:/D:/dev/Java/jdk1.8.0_45/jre/classes

extClassloader加载以下文件：
D:\dev\Java\jdk1.8.0_45\jre\lib\ext;C:\Windows\Sun\Java\lib\ext

appClassLoader加载以下文件：
D:\dev\Java\jdk1.8.0_45\jre\lib\charsets.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\deploy.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\access-bridge-64.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\cldrdata.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\dnsns.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\jaccess.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\jfxrt.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\localedata.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\nashorn.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\sunec.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\sunjce_provider.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\sunmscapi.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\sunpkcs11.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\ext\zipfs.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\javaws.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\jce.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\jfr.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\jfxswt.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\jsse.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\management-agent.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\plugin.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\resources.jar;D:\dev\Java\jdk1.8.0_45\jre\lib\rt.jar;D:\ideaProjects\project-all\target\classes;C:\Users\zhuge\.m2\repository\org\apache\zookeeper\zookeeper\3.4.12\zookeeper-3.4.12.jar;C:\Users\zhuge\.m2\repository\org\slf4j\slf4j-api\1.7.25\slf4j-api-1.7.25.jar;C:\Users\zhuge\.m2\repository\org\slf4j\slf4j-log4j12\1.7.25\slf4j-log4j12-1.7.25.jar;C:\Users\zhuge\.m2\repository\log4j\log4j\1.2.17\log4j-1.2.17.jar;C:\Users\zhuge\.m2\repository\jline\jline\0.9.94\jline-0.9.94.jar;C:\Users\zhuge\.m2\repository\org\apache\yetus\audience-annotations\0.5.0\audience-annotations-0.5.0.jar;C:\Users\zhuge\.m2\repository\io\netty\netty\3.10.6.Final\netty-3.10.6.Final.jar;C:\Users\zhuge\.m2\repository\com\google\guava\guava\22.0\guava-22.0.jar;C:\Users\zhuge\.m2\repository\com\google\code\findbugs\jsr305\1.3.9\jsr305-1.3.9.jar;C:\Users\zhuge\.m2\repository\com\google\errorprone\error_prone_annotations\2.0.18\error_prone_annotations-2.0.18.jar;C:\Users\zhuge\.m2\repository\com\google\j2objc\j2objc-annotations\1.1\j2objc-annotations-1.1.jar;C:\Users\zhuge\.m2\repository\org\codehaus\mojo\animal-sniffer-annotations\1.14\animal-sniffer-annotations-1.14.jar;D:\dev\IntelliJ IDEA 2018.3.2\lib\idea_rt.jar

```

**类加载器初始化过程：**

参见类运行加载全过程图可知其中会创建JVM启动器实例`sun.misc.Launcher`。

在`Launcher`构造方法内部，其创建了两个类加载器，分别是`sun.misc.Launcher.ExtClassLoader`(扩展类加载器)和`sun.misc.Launcher.AppClassLoader`(应用类加载器)。

JVM默认使用`Launcher`的`getClassLoader()`方法返回的类加载器`AppClassLoader`的实例加载我们的应用程序。

```java
//Launcher的构造方法
public Launcher() {
    Launcher.ExtClassLoader var1;
    try {
        //构造扩展类加载器，在构造的过程中将其父加载器设置为null
        var1 = Launcher.ExtClassLoader.getExtClassLoader();
    } catch (IOException var10) {
        throw new InternalError("Could not create extension class loader", var10);
    }

    try {
        //构造应用类加载器，在构造的过程中将其父加载器设置为ExtClassLoader，
        //Launcher的loader属性值是AppClassLoader，我们一般都是用这个类加载器来加载我们自己写的应用程序
        this.loader = Launcher.AppClassLoader.getAppClassLoader(var1);
    } catch (IOException var9) {
        throw new InternalError("Could not create application class loader", var9);
    }

    Thread.currentThread().setContextClassLoader(this.loader);
    String var2 = System.getProperty("java.security.manager");
    。。。 。。。 //省略一些不需关注代码

}
```

### 双亲委派机制

JVM类加载器是有亲子层级结构的，如下图

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/102278.png)

这里类加载其实就有一个**双亲委派机制**，加载某个类时会先委托父加载器寻找目标类，找不到再委托上层父加载器加载，如果所有父加载器在自己的加载类路径下都找不到目标类，则在自己的类加载路径中查找并载入目标类。

比如我们的`Math`类，最先会找应用程序类加载器加载，应用程序类加载器会先委托扩展类加载器加载，扩展类加载器再委托引导类加载器，顶层引导类加载器在自己的类加载路径里找了半天没找到`Math`类，则向下退回加载Math类的请求，扩展类加载器收到回复就自己加载，在自己的类加载路径里找了半天也没找到`Math`类，又向下退回`Math`类的加载请求给应用程序类加载器，应用程序类加载器于是在自己的类加载路径里找`Math`类，结果找到了就自己加载了。

**双亲委派机制说简单点就是：先找父亲加载，不行再由儿子自己加载**

我们来看下应用程序类加载器`AppClassLoader`加载类的双亲委派机制源码，`AppClassLoader`的`loadClass`方法最终会调用其父类`ClassLoader`的`loadClass`方法，该方法的大体逻辑如下：

1. 首先，检查一下指定名称的类是否已经加载过，如果加载过了，就不需要再加载，直接返回。
2. 如果此类没有加载过，那么，再判断一下是否有父加载器；如果有父加载器，则由父加载器加载（即调用`parent.loadClass(name, false);`）.或者是调用`bootstrap`类加载器来加载。
3. 如果父加载器及`bootstrap`类加载器都没有找到指定的类，那么调用当前类加载器的`findClass`方法来完成类加载。

```java
//ClassLoader的loadClass方法，里面实现了双亲委派机制
protected Class<?> loadClass(String name, boolean resolve)
    throws ClassNotFoundException
{
    synchronized (getClassLoadingLock(name)) {
        // 检查当前类加载器是否已经加载了该类
        Class<?> c = findLoadedClass(name);
        if (c == null) {
            long t0 = System.nanoTime();
            try {
                if (parent != null) {  //如果当前加载器父加载器不为空则委托父加载器加载该类
                    c = parent.loadClass(name, false);
                } else {  //如果当前加载器父加载器为空则委托引导类加载器加载该类
                    c = findBootstrapClassOrNull(name);
                }
            } catch (ClassNotFoundException e) {
                // ClassNotFoundException thrown if class not found
                // from the non-null parent class loader
            }

            if (c == null) {
                // If still not found, then invoke findClass in order
                // to find the class.
                long t1 = System.nanoTime();
                //都会调用URLClassLoader的findClass方法在加载器的类路径里查找并加载该类
                c = findClass(name);

                // this is the defining class loader; record the stats
                sun.misc.PerfCounter.getParentDelegationTime().addTime(t1 - t0);
                sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                sun.misc.PerfCounter.getFindClasses().increment();
            }
        }
        if (resolve) {  //不会执行
            resolveClass(c);
        }
        return c;
    }
}
```

**为什么要设计双亲委派机制？**

- 沙箱安全机制：自己写的`java.lang.String.class`类不会被加载，这样便可以防止核心API库被随意篡改
- 避免类的重复加载：当父亲已经加载了该类时，就没有必要子`ClassLoader`再加载一次，保证**被加载类的唯一性**

看一个类加载示例：

```java
package java.lang;

public class String {
    public static void main(String[] args) {
        System.out.println("**************My String Class**************");
    }
}

运行结果：
错误: 在类 java.lang.String 中找不到 main 方法, 请将 main 方法定义为:
   public static void main(String[] args)
否则 JavaFX 应用程序类必须扩展javafx.application.Application
```

### 全盘负责委托机制

**“全盘负责”是指当一个`ClassLoder`装载一个类时，除非显示的使用另外一个`ClassLoder`，该类所依赖及引用的类也由这个`ClassLoder`载入。**

**自定义类加载器示例：**

自定义类加载器只需要继承 `java.lang.ClassLoader` 类，该类有两个核心方法，一个是`loadClass(String, boolean)`，实现了**双亲委派机制**，还有一个方法是`findClass`，默认实现是空方法，所以我们自定义类加载器主要是**重写`findClass`方法**。

```java
public class MyClassLoaderTest {
    static class MyClassLoader extends ClassLoader {
        private String classPath;

        public MyClassLoader(String classPath) {
            this.classPath = classPath;
        }

        private byte[] loadByte(String name) throws Exception {
            name = name.replaceAll("\\.", "/");
            FileInputStream fis = new FileInputStream(classPath + "/" + name
                    + ".class");
            int len = fis.available();
            byte[] data = new byte[len];
            fis.read(data);
            fis.close();
            return data;
        }

        protected Class<?> findClass(String name) throws ClassNotFoundException {
            try {
                byte[] data = loadByte(name);
                //defineClass将一个字节数组转为Class对象，这个字节数组是class文件读取后最终的字节数组。
                return defineClass(name, data, 0, data.length);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ClassNotFoundException();
            }
        }

    }

    public static void main(String args[]) throws Exception {
        //初始化自定义类加载器，会先初始化父类ClassLoader，其中会把自定义类加载器的父加载器设置为应用程序类加载器AppClassLoader
        MyClassLoader classLoader = new MyClassLoader("D:/test");
        //D盘创建 test/com/tuling/jvm 几级目录，将User类的复制类User1.class丢入该目录
        Class clazz = classLoader.loadClass("com.tuling.jvm.User1");
        Object obj = clazz.newInstance();
        Method method = clazz.getDeclaredMethod("sout", null);
        method.invoke(obj, null);
        System.out.println(clazz.getClassLoader().getClass().getName());
    }
}

运行结果：
=======自己的加载器加载类调用方法=======
com.tuling.jvm.MyClassLoaderTest$MyClassLoader
```

### 打破双亲委派机制

再来一个沙箱安全机制示例，尝试打破双亲委派机制，用自定义类加载器加载我们自己实现的 `java.lang.String.class`

```java
public class MyClassLoaderTest {
    static class MyClassLoader extends ClassLoader {
        private String classPath;

        public MyClassLoader(String classPath) {
            this.classPath = classPath;
        }

        private byte[] loadByte(String name) throws Exception {
            name = name.replaceAll("\\.", "/");
            FileInputStream fis = new FileInputStream(classPath + "/" + name
                    + ".class");
            int len = fis.available();
            byte[] data = new byte[len];
            fis.read(data);
            fis.close();
            return data;

        }

        protected Class<?> findClass(String name) throws ClassNotFoundException {
            try {
                byte[] data = loadByte(name);
                return defineClass(name, data, 0, data.length);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ClassNotFoundException();
            }
        }

        /**
         * 重写类加载方法，实现自己的加载逻辑，不委派给双亲加载
         * @param name
         * @param resolve
         * @return
         * @throws ClassNotFoundException
         */
        protected Class<?> loadClass(String name, boolean resolve)
                throws ClassNotFoundException {
            synchronized (getClassLoadingLock(name)) {
                // First, check if the class has already been loaded
                Class<?> c = findLoadedClass(name);

                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();
                    c = findClass(name);

                    // this is the defining class loader; record the stats
                    sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    sun.misc.PerfCounter.getFindClasses().increment();
                }
                if (resolve) {
                    resolveClass(c);
                }
                return c;
            }
        }
    }

    public static void main(String args[]) throws Exception {
        MyClassLoader classLoader = new MyClassLoader("D:/test");
        //尝试用自己改写类加载机制去加载自己写的java.lang.String.class
        Class clazz = classLoader.loadClass("java.lang.String");
        Object obj = clazz.newInstance();
        Method method= clazz.getDeclaredMethod("sout", null);
        method.invoke(obj, null);
        System.out.println(clazz.getClassLoader().getClass().getName());
    }
}

运行结果：
java.lang.SecurityException: Prohibited package name: java.lang
	at java.lang.ClassLoader.preDefineClass(ClassLoader.java:659)
	at java.lang.ClassLoader.defineClass(ClassLoader.java:758)
```

#### Tomcat打破双亲委派机制

以Tomcat类加载为例，Tomcat 如果使用默认的双亲委派类加载机制行不行？

我们思考一下：Tomcat是个web容器， 那么它要解决什么问题： 

1. 一个web容器可能需要部署两个应用程序，不同的应用程序可能会**依赖同一个第三方类库的不同版本**，不能要求同一个类库在同一个服务器只有一份，因此要保证每个应用程序的类库都是独立的，保证相互隔离。 

2. 部署在同一个web容器中**相同的类库相同的版本可以共享**。否则，如果服务器有10个应用程序，那么要有10份相同的类库加载进虚拟机。 

3. **web容器也有自己依赖的类库，不能与应用程序的类库混淆**。基于安全考虑，应该让容器的类库和程序的类库隔离开来。 

4. web容器要支持`jsp`的修改，我们知道，`jsp` 文件最终也是要编译成`class`文件才能在虚拟机中运行，但程序运行后修改`jsp`已经是司空见惯的事情， web容器需要支持 `jsp` 修改后不用重启。

再看看我们的问题：**Tomcat 如果使用默认的双亲委派类加载机制行不行？** 

> 答案是不行的。为什么？
>
> 第一个问题，如果使用默认的类加载器机制，那么是无法加载两个相同类库的不同版本的，默认的类加器是不管你是什么版本的，只在乎你的全限定类名，并且只有一份。
>
> 第二个问题，默认的类加载器是能够实现的，因为他的职责就是保证**唯一性**。
>
> 第三个问题和第一个问题一样。
>
> 我们再看第四个问题，我们想我们要怎么实现`jsp`文件的热加载，`jsp` 文件其实也就是`class`文件，那么如果修改了，但类名还是一样，类加载器会直接取方法区中已经存在的，修改后的`jsp`是不会重新加载的。那么怎么办呢？我们可以直接卸载掉这`jsp`文件的类加载器，所以你应该想到了，**每个`jsp`文件对应一个唯一的类加载器，当一个`jsp`文件修改了，就直接卸载这个`jsp`类加载器。重新创建类加载器，重新加载`jsp`文件。**

#### Tomcat自定义加载器详解

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/102281.png)

tomcat的几个主要类加载器：

- `commonLoader`：Tomcat最基本的类加载器，加载路径中的class可以被Tomcat容器本身以及各个Webapp访问；
- `catalinaLoader`：Tomcat容器私有的类加载器，加载路径中的class对于Webapp不可见；
- `sharedLoader`：各个Webapp共享的类加载器，加载路径中的class对于所有Webapp可见，但是对于Tomcat容器不可见；
- `WebappClassLoader`：各个Webapp私有的类加载器，加载路径中的class只对当前Webapp可见，比如加载war包里相关的类，每个war包应用都有自己的`WebappClassLoader`，实现相互隔离，比如不同war包应用引入了不同的spring版本，这样实现就能加载各自的spring版本；

从图中的委派关系中可以看出：

`CommonClassLoader`能加载的类都可以被`CatalinaClassLoader`和`SharedClassLoader`使用，从而实现了公有类库的共用，而`CatalinaClassLoader`和`SharedClassLoader`自己能加载的类则与对方相互隔离。

`WebAppClassLoader`可以使用`SharedClassLoader`加载到的类，但各个`WebAppClassLoader`实例之间相互隔离。

而`JasperLoader`的加载范围仅仅是这个`JSP`文件所编译出来的那一个`.class`文件，它出现的目的就是为了被丢弃：当Web容器检测到`JSP`文件被修改时，会替换掉目前的`JasperLoader`的实例，并通过再建立一个新的`Jsp`类加载器来实现`JSP`文件的热加载功能。

tomcat 这种类加载机制违背了java 推荐的双亲委派模型了吗？

> 答案是：违背了。 
>
> 很显然，tomcat 不是这样实现，tomcat 为了实现隔离性，没有遵守这个约定，**每个`webappClassLoader`加载自己的目录下的class文件，不会传递给父类加载器，打破了双亲委派机制**。

**模拟实现Tomcat的`webappClassLoader`加载自己war包应用内不同版本类实现相互共存与隔离**

```java
public class MyClassLoaderTest {
    static class MyClassLoader extends ClassLoader {
        private String classPath;

        public MyClassLoader(String classPath) {
            this.classPath = classPath;
        }

        private byte[] loadByte(String name) throws Exception {
            name = name.replaceAll("\\.", "/");
            FileInputStream fis = new FileInputStream(classPath + "/" + name
                    + ".class");
            int len = fis.available();
            byte[] data = new byte[len];
            fis.read(data);
            fis.close();
            return data;

        }

        protected Class<?> findClass(String name) throws ClassNotFoundException {
            try {
                byte[] data = loadByte(name);
                return defineClass(name, data, 0, data.length);
            } catch (Exception e) {
                e.printStackTrace();
                throw new ClassNotFoundException();
            }
        }

        /**
         * 重写类加载方法，实现自己的加载逻辑，不委派给双亲加载
         * @param name
         * @param resolve
         * @return
         * @throws ClassNotFoundException
         */
        protected Class<?> loadClass(String name, boolean resolve)
                throws ClassNotFoundException {
            synchronized (getClassLoadingLock(name)) {
                // First, check if the class has already been loaded
                Class<?> c = findLoadedClass(name);

                if (c == null) {
                    // If still not found, then invoke findClass in order
                    // to find the class.
                    long t1 = System.nanoTime();

                    //非自定义的类还是走双亲委派加载
                    if (!name.startsWith("com.tuling.jvm")){
                        c = this.getParent().loadClass(name);
                    }else{
                        c = findClass(name);
                    }

                    // this is the defining class loader; record the stats
                    sun.misc.PerfCounter.getFindClassTime().addElapsedTimeFrom(t1);
                    sun.misc.PerfCounter.getFindClasses().increment();
                }
                if (resolve) {
                    resolveClass(c);
                }
                return c;
            }
        }
    }

    public static void main(String args[]) throws Exception {
        MyClassLoader classLoader = new MyClassLoader("D:/test");
        Class clazz = classLoader.loadClass("com.tuling.jvm.User1");
        Object obj = clazz.newInstance();
        Method method= clazz.getDeclaredMethod("sout", null);
        method.invoke(obj, null);
        System.out.println(clazz.getClassLoader());
        
        System.out.println();
        MyClassLoader classLoader1 = new MyClassLoader("D:/test1");
        Class clazz1 = classLoader1.loadClass("com.tuling.jvm.User1");
        Object obj1 = clazz1.newInstance();
        Method method1= clazz1.getDeclaredMethod("sout", null);
        method1.invoke(obj1, null);
        System.out.println(clazz1.getClassLoader());
    }
}

运行结果：
=======自己的加载器加载类调用方法=======
com.tuling.jvm.MyClassLoaderTest$MyClassLoader@266474c2

=======另外一个User1版本：自己的加载器加载类调用方法=======
com.tuling.jvm.MyClassLoaderTest$MyClassLoader@66d3c617
```

> 同一个JVM内，两个相同包名和类名的类对象可以共存，因为他们的类加载器可以不一样，所以看两个类对象是否是同一个，除了看类的包名和类名是否都相同之外，还需要他们的类加载器也是同一个才能认为他们是同一个。

#### Tomcat的`JasperLoader`热加载

原理：后台启动线程监听`jsp`文件变化，如果变化了找到该`jsp`对应的`servlet`类的加载器引用(`gcroot`)，重新生成新的**`JasperLoader`**加载器赋值给引用，然后加载新的`jsp`对应的`servlet`类，之前的那个加载器因为没有`gcroot`引用了，下一次`gc`的时候会被销毁。

**补充：Hotspot源码JVM启动执行main方法流程**

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/106918.png)

## JDK体系结构

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/94563.png)

### Java语言的跨平台特性

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/94569.png)

### JVM整体结构及内存模型

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95302.png)

**补充一个问题：**

**在`minor gc`过程中对象挪动后，引用如何修改？**

> 对象在堆内部挪动的过程其实是复制，原有区域对象还在，一般不直接清理，JVM内部清理过程只是将对象分配指针移动到区域的头位置即可，比如扫描s0区域，扫到`gcroot`引用的非垃圾对象是将这些对象**复制**到s1或老年代，最后扫描完了将s0区域的对象分配指针移动到区域的起始位置即可，s0区域之前对象并不直接清理，当有新对象分配了，原有区域里的对象也就被清除了。
>
> `minor gc`在根扫描过程中会记录所有被扫描到的对象引用(在年轻代这些引用很少，因为大部分都是垃圾对象不会扫描到)，如果引用的对象被复制到新地址了，最后会一并更新引用指向新地址。
>
> 这里面内部算法比较复杂，感兴趣可以参考R大的这篇文章：
>
> https://www.zhihu.com/question/42181722/answer/145085437
>
> https://hllvm-group.iteye.com/group/topic/39376#post-257329

### JVM内存参数设置

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/77391.png)

Spring Boot程序的JVM参数设置格式(Tomcat启动直接加在bin目录下`catalina.sh`文件里)：

```sh
java -Xms2048M -Xmx2048M -Xmn1024M -Xss512K -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -jar microservice-eureka-server.jar  
```

#### 相关参数

| 参数              | 含义                                                         |
| ----------------- | ------------------------------------------------------------ |
| -Xss              | 每个线程的栈大小                                             |
| -Xms              | 设置堆的初始可用大小，默认物理内存的1/64                     |
| -Xmx              | 设置堆的最大可用大小，默认物理内存的1/4                      |
| -Xmn              | 新生代大小，默认情况下，年轻代将占用整个堆空间的 1/3         |
| -XX:NewRatio      | 默认2表示新生代占年老代的1/2，占整个堆内存的1/3              |
| -XX:SurvivorRatio | 默认8表示一个survivor区占用1/8的Eden内存，即1/10的新生代内存 |

关于元空间的JVM参数有两个：`-XX:MetaspaceSize=N`和 `-XX:MaxMetaspaceSize=N`

**-XX：MaxMetaspaceSize**： 设置元空间最大值， 默认是-1， 即不限制， 或者说只受限于本地内存大小。

**-XX：MetaspaceSize**： 指定元空间触发`full gc`的初始阈值(元空间无固定初始大小)， 以字节为单位，默认是`21M`左右，达到该值就会触发`full gc`进行类型卸载， 同时收集器会对该值进行调整： 如果释放了大量的空间， 就适当降低该值； 如果释放了很少的空间， 那么在不超过`-XX：MaxMetaspaceSize`（如果设置了的话） 的情况下， 适当提高该值。这个跟早期jdk版本的**-XX:PermSize**参数意思不一样，-**XX:PermSize**代表永久代的初始容量。

由于调整元空间的大小需要`Full GC`，这是非常昂贵的操作，如果应用在启动的时候发生大量`Full GC`，通常都是由于永久代或元空间发生了大小调整，基于这种情况，一般建议在JVM参数中将`MetaspaceSize`和`MaxMetaspaceSize`设置成一样的值，并设置得比初始值要大，对于`8G`物理内存的机器来说，一般我会将这两个值都设置为`256M`。

**StackOverflowError**示例：

```java
// JVM设置  -Xss128k(默认1M)
public class StackOverflowTest {
    
    static int count = 0;
    
    static void redo() {
        count++;
        redo();
    }

    public static void main(String[] args) {
        try {
            redo();
        } catch (Throwable t) {
            t.printStackTrace();
            System.out.println(count);
        }
    }
}

运行结果：
java.lang.StackOverflowError
	at com.tuling.jvm.StackOverflowTest.redo(StackOverflowTest.java:12)
	at com.tuling.jvm.StackOverflowTest.redo(StackOverflowTest.java:13)
	at com.tuling.jvm.StackOverflowTest.redo(StackOverflowTest.java:13)
   ......
```

> **结论：**`-Xss`设置越小count值越小，说明一个线程栈里能分配的栈帧就越少，但是对JVM整体来说能开启的线程数会更多

#### 日均百万级订单交易系统如何设置JVM参数

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/94575.png)

> JVM参数大小设置并没有固定标准，需要根据实际项目情况分析
>
> **结论：通过上面这些内容介绍，对JVM优化有些概念了，就是尽可能让对象都在新生代里分配和回收，尽量别让太多对象频繁进入老年代，避免频繁对老年代进行垃圾回收，同时给系统充足的内存大小，避免新生代频繁的进行垃圾回收。**

## JVM对象创建与内存分配机制

### 对象的创建

对象创建的主要流程:

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/123315.png)

#### 1.类加载检查

虚拟机遇到一条new指令时，首先将去检查这个指令的参数是否能在常量池中定位到一个类的符号引用，并且检查这个符号引用代表的类是否已被加载、解析和初始化过。如果没有，那必须先执行相应的类加载过程。

new指令对应到语言层面上讲是，new关键词、对象克隆、对象序列化等。

#### 2.分配内存

在类加载检查通过后，接下来虚拟机将为新生对象分配内存。对象所需内存的大小在类 加载完成后便可完全确定，为对象分配空间的任务等同于把 一块确定大小的内存从Java堆中划分出来。

这个步骤有两个问题：

1. 如何划分内存。

2. 在并发情况下， 可能出现正在给对象A分配内存，指针还没来得及修改，对象B又同时使用了原来的指针来分配内存的情况。

**划分内存的方法：**

- “指针碰撞”（`Bump the Pointer`）(默认用指针碰撞)

如果Java堆中内存是绝对规整的，所有用过的内存都放在一边，空闲的内存放在另一边，中间放着一个指针作为分界点的指示器，那所分配内存就仅仅是把那个指针向空闲空间那边挪动一段与对象大小相等的距离。

- “空闲列表”（`Free List`）

如果Java堆中的内存并不是规整的，已使用的内存和空闲的内存相互交错，那就没有办法简单地进行指针碰撞了，虚拟机就必须维护一个列表，记录上哪些内存块是可用的，在分配的时候从列表中找到一块足够大的空间划分给对象实例， 并更新列表上的记录

**解决并发问题的方法：**

- CAS（`compare and swap`）

虚拟机采用**CAS配上失败重试**的方式保证更新操作的原子性来对分配内存空间的动作进行同步处理。

- 本地线程分配缓冲（`Thread Local Allocation Buffer, TLAB`）

把内存分配的动作按照线程划分在不同的空间之中进行，即每个线程在Java堆中预先分配一小块内存。通过`-XX:+/-UseTLAB`参数来设定虚拟机是否使用`TLAB`(JVM会默认开启`-XX:+UseTLAB`)，`-XX:TLABSize` 指定`TLAB`大小。

#### 3.初始化零值

内存分配完成后，虚拟机需要将分配到的内存空间都**初始化为零值**（不包括对象头）， 如果使用`TLAB`，这一工作过程也可以提前至`TLAB`分配时进行。这一步操作保证了对象的实例字段在Java代码中可以不赋初始值就直接使用，程序能访问到这些字段的数据类型所对应的零值。

#### 4.设置对象头

初始化零值之后，虚拟机要对对象进行必要的设置，例如这个对象是哪个类的实例、如何才能找到类的元数据信息、对象的哈希码、对象的GC分代年龄等信息。这些信息存放在对象的对象头`Object Header`之中。

在`HotSpot`虚拟机中，对象在内存中存储的布局可以分为3块区域：对象头（`Header`）、实例数据（`Instance Data`）和对齐填充（`Padding`）。

 `HotSpot`虚拟机的对象头包括两部分信息

1. 第一部分用于存储对象自身的运行时数据， 如哈希码（`HashCode`）、GC分代年龄、锁状态标志、线程持有的锁、偏向线程ID、偏向时 间戳等。
2. 对象头的另外一部分是类型指针，即对象指向它的类元数据的指针，虚拟机通过这个指针来确定这个对象是哪个类的实例。

**32位对象头**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/123316.png)

**64位对象头**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/123317.png)

对象头在`hotspot`的C++源码`markOop.hpp`文件里的注释如下：

```c++
// Bit-format of an object header (most significant first, big endian layout below):
//
//  32 bits:
//  --------
//             hash:25 ------------>| age:4    biased_lock:1 lock:2 (normal object)
//             JavaThread*:23 epoch:2 age:4    biased_lock:1 lock:2 (biased object)
//             size:32 ------------------------------------------>| (CMS free block)
//             PromotedObject*:29 ---------->| promo_bits:3 ----->| (CMS promoted object)
//
//  64 bits:
//  --------
//  unused:25 hash:31 -->| unused:1   age:4    biased_lock:1 lock:2 (normal object)
//  JavaThread*:54 epoch:2 unused:1   age:4    biased_lock:1 lock:2 (biased object)
//  PromotedObject*:61 --------------------->| promo_bits:3 ----->| (CMS promoted object)
//  size:64 ----------------------------------------------------->| (CMS free block)
//
//  unused:25 hash:31 -->| cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && normal object)
//  JavaThread*:54 epoch:2 cms_free:1 age:4    biased_lock:1 lock:2 (COOPs && biased object)
//  narrowOop:32 unused:24 cms_free:1 unused:4 promo_bits:3 ----->| (COOPs && CMS promoted object)
//  unused:21 size:35 -->| cms_free:1 unused:7 ------------------>| (COOPs && CMS free block)
```

#### 5.执行init方法

执行`init`方法，即对象按照程序员的意愿进行初始化。对应到语言层面上讲，就是为属性赋值（注意，这与上面的赋零值不同，这是由程序员赋的值），和执行构造方法。

### 对象半初始化

**对象大小与指针压缩**

对象大小可以用`jol-core`包查看，引入依赖

```xml
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.9</version>
</dependency>
```

```java
import org.openjdk.jol.info.ClassLayout;

/**
 * 计算对象大小
 */
public class JOLSample {

    public static void main(String[] args) {
        ClassLayout layout = ClassLayout.parseInstance(new Object());
        System.out.println(layout.toPrintable());

        System.out.println();
        ClassLayout layout1 = ClassLayout.parseInstance(new int[]{});
        System.out.println(layout1.toPrintable());

        System.out.println();
        ClassLayout layout2 = ClassLayout.parseInstance(new A());
        System.out.println(layout2.toPrintable());
    }

    // -XX:+UseCompressedOops           默认开启的压缩所有指针
    // -XX:+UseCompressedClassPointers  默认开启的压缩对象头里的类型指针Klass Pointer
    // Oops : Ordinary Object Pointers
    public static class A {
                       //8B mark word
                       //4B Klass Pointer   如果关闭压缩-XX:-UseCompressedClassPointers或-XX:-UseCompressedOops，则占用8B
        int id;        //4B
        String name;   //4B  如果关闭压缩-XX:-UseCompressedOops，则占用8B
        byte b;        //1B 
        Object o;      //4B  如果关闭压缩-XX:-UseCompressedOops，则占用8B
    }
}


运行结果：
java.lang.Object object internals:
 OFFSET  SIZE   TYPE DESCRIPTION                               VALUE
      0     4        (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)    //mark word
      4     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)    //mark word     
      8     4        (object header)                           e5 01 00 f8 (11100101 00000001 00000000 11111000) (-134217243)    //Klass Pointer
     12     4        (loss due to the next object alignment)
Instance size: 16 bytes
Space losses: 0 bytes internal + 4 bytes external = 4 bytes total


[I object internals:
 OFFSET  SIZE   TYPE DESCRIPTION                               VALUE
      0     4        (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4        (object header)                           6d 01 00 f8 (01101101 00000001 00000000 11111000) (-134217363)
     12     4        (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
     16     0    int [I.<elements>                             N/A
Instance size: 16 bytes
Space losses: 0 bytes internal + 0 bytes external = 0 bytes total


com.tuling.jvm.JOLSample$A object internals:
 OFFSET  SIZE               TYPE DESCRIPTION                               VALUE
      0     4                    (object header)                           01 00 00 00 (00000001 00000000 00000000 00000000) (1)
      4     4                    (object header)                           00 00 00 00 (00000000 00000000 00000000 00000000) (0)
      8     4                    (object header)                           61 cc 00 f8 (01100001 11001100 00000000 11111000) (-134165407)
     12     4                int A.id                                      0
     16     1               byte A.b                                       0
     17     3                    (alignment/padding gap)                  
     20     4   java.lang.String A.name                                    null
     24     4   java.lang.Object A.o                                       null
     28     4                    (loss due to the next object alignment)
Instance size: 32 bytes
Space losses: 3 bytes internal + 4 bytes external = 7 bytes total
```

什么是java对象的**指针压缩**？

1. `jdk1.6 update14`开始，在64bit操作系统中，JVM支持指针压缩

2. jvm配置参数：`UseCompressedOops`，`compressed`--压缩、`oop(ordinary object pointer)`--对象指针

3. 启用指针压缩:`-XX:+UseCompressedOops`(**默认开启**)

为什么要进行指针压缩？

1. 在64位平台的`HotSpot`中使用32位指针(实际存储用64位)，内存使用会多出1.5倍左右，使用较大指针在主内存和缓存之间移动数据，**占用较大宽带，同时GC也会承受较大压力**

2. 为了减少64位平台下内存的消耗，启用指针压缩功能

3. 在jvm中，32位地址最大支持4G内存(2的32次方)，可以通过对对象指针的存入**堆内存**时压缩编码、取出到**cpu寄存器**后解码方式进行优化(对象指针在堆中是32位，在寄存器中是35位，2的35次方=32G)，使得jvm只用32位地址就可以支持更大的内存配置(小于等于32G)

4. 堆内存小于4G时，不需要启用指针压缩，jvm会直接去除高32位地址，即使用低虚拟地址空间

5. 堆内存大于32G时，压缩指针会失效，会强制使用64位(即8字节)来对java对象寻址，这就会出现1的问题，所以堆内存不要大于32G为好

**关于对齐填充：**对于大部分处理器，对象以8字节整数倍来对齐填充都是最高效的存取方式。

### 对象内存分配

**对象内存分配流程图**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/123318.png)

#### 对象栈上分配

我们通过JVM内存分配可以知道JAVA中的对象都是在堆上进行分配，当对象没有被引用的时候，需要依靠GC进行回收内存，如果对象数量较多的时候，会给GC带来较大压力，也间接影响了应用的性能。为了减少临时对象在堆内分配的数量，JVM通过**逃逸分析**确定该对象不会被外部访问。如果不会逃逸可以将该对象在**栈上分配**内存，这样该对象所占用的内存空间就可以随栈帧出栈而销毁，就减轻了垃圾回收的压力。

**对象逃逸分析**：就是分析对象**动态作用域**，当一个对象在方法中被定义后，它可能被外部方法所引用，例如作为调用参数传递到其他地方中。

```java
public User test1() {
   User user = new User();
   user.setId(1);
   user.setName("zhuge");
   //TODO 保存到数据库
   return user;
}

public void test2() {
   User user = new User();
   user.setId(1);
   user.setName("zhuge");
   //TODO 保存到数据库
}
```

很显然`test1`方法中的`user`对象被返回了，这个对象的作用域范围不确定，`test2`方法中的`user`对象我们可以确定当方法结束这个对象就可以认为是**无效对象**了，对于这样的对象我们其实可以将其分配在栈内存里，让其在方法结束时跟随栈内存一起被回收掉。

JVM对于这种情况可以通过开启逃逸分析参数(`-XX:+DoEscapeAnalysis`)来优化对象内存分配位置，使其通过**标量替换**优先分配在栈上(**栈上分配**)，**JDK7之后默认开启逃逸分析**，如果要关闭使用参数(`-XX:-DoEscapeAnalysis`)

**标量替换：**通过逃逸分析确定该对象不会被外部访问，并且对象可以被进一步分解时，**JVM不会创建该对象**，而是将该对象成员变量分解若干个被这个方法使用的成员变量所代替，这些代替的成员变量在栈帧或寄存器上分配空间，这样就不会因为没有一大块连续空间导致对象内存不够分配。开启标量替换参数(`-XX:+EliminateAllocations`)，**JDK7之后默认开启**。

**标量与聚合量：**标量即不可被进一步分解的量，而JAVA的**基本数据类型就是标量**（如：`int，long`等基本数据类型以及`reference`类型等），标量的对立就是可以被进一步分解的量，而这种量称之为聚合量。而在JAVA中对象就是可以被进一步分解的聚合量。

**栈上分配示例：**

```java
/**
 * 栈上分配，标量替换
 * 代码调用了1亿次alloc()，如果是分配到堆上，大概需要1GB以上堆空间，如果堆空间小于该值，必然会触发GC。
 * 
 * 使用如下参数不会发生GC
 * -Xmx15m -Xms15m -XX:+DoEscapeAnalysis -XX:+PrintGC -XX:+EliminateAllocations
 * 使用如下参数都会发生大量GC
 * -Xmx15m -Xms15m -XX:-DoEscapeAnalysis -XX:+PrintGC -XX:+EliminateAllocations
 * -Xmx15m -Xms15m -XX:+DoEscapeAnalysis -XX:+PrintGC -XX:-EliminateAllocations
 */
public class AllotOnStack {

    public static void main(String[] args) {
        long start = System.currentTimeMillis();
        for (int i = 0; i < 100000000; i++) {
            alloc();
        }
        long end = System.currentTimeMillis();
        System.out.println(end - start);
    }

    private static void alloc() {
        User user = new User();
        user.setId(1);
        user.setName("zhuge");
    }
}
```

> **结论：栈上分配依赖于逃逸分析和标量替换**

#### 对象在Eden区分配

大多数情况下，对象在新生代中 `Eden` 区分配。当 `Eden` 区没有足够空间进行分配时，虚拟机将发起一次`Minor GC`。下面来进行实际测试一下。

在测试之前先来看看 **`Minor GC`和`Full GC` 有什么不同？**

- **Minor GC/Young GC**：指发生新生代的的垃圾收集动作，`Minor GC`非常频繁，回收速度一般也比较快。
- **Major GC/Full GC**：一般会回收老年代 ，年轻代，方法区的垃圾，Major GC的速度一般会比Minor GC的慢10倍以上。

**`Eden`与`Survivor`区默认8:1:1**

大量的对象被分配在`eden`区，`eden`区满了后会触发`minor gc`，可能会有99%以上的对象成为垃圾被回收掉，剩余存活的对象会被挪到为空的那块`survivor`区，下一次`eden`区满了后又会触发`minor gc`，把`eden`区和`survivor`区垃圾对象回收，把剩余存活的对象一次性挪动到另外一块为空的`survivor`区，因为新生代的对象都是朝生夕死的，存活时间很短，所以JVM默认的`8:1:1`的比例是很合适的，**让`eden`区尽量的大，`survivor`区够用即可，**

JVM默认有这个参数`-XX:+UseAdaptiveSizePolicy`(默认开启)，会导致这个`8:1:1`比例自动变化，如果不想这个比例有变化可以设置参数`-XX:-UseAdaptiveSizePolicy`

**示例：**

```java
//添加运行JVM参数： -XX:+PrintGCDetails
public class GCTest {
   public static void main(String[] args) throws InterruptedException {
      byte[] allocation1, allocation2/*, allocation3, allocation4, allocation5, allocation6*/;
      allocation1 = new byte[60000*1024];

      //allocation2 = new byte[8000*1024];

      /*allocation3 = new byte[1000*1024];
     allocation4 = new byte[1000*1024];
     allocation5 = new byte[1000*1024];
     allocation6 = new byte[1000*1024];*/
   }
}

运行结果：
Heap
 PSYoungGen      total 76288K, used 65536K [0x000000076b400000, 0x0000000770900000, 0x00000007c0000000)
  eden space 65536K, 100% used [0x000000076b400000,0x000000076f400000,0x000000076f400000)
  from space 10752K, 0% used [0x000000076fe80000,0x000000076fe80000,0x0000000770900000)
  to   space 10752K, 0% used [0x000000076f400000,0x000000076f400000,0x000000076fe80000)
 ParOldGen       total 175104K, used 0K [0x00000006c1c00000, 0x00000006cc700000, 0x000000076b400000)
  object space 175104K, 0% used [0x00000006c1c00000,0x00000006c1c00000,0x00000006cc700000)
 Metaspace       used 3342K, capacity 4496K, committed 4864K, reserved 1056768K
  class space    used 361K, capacity 388K, committed 512K, reserved 1048576K
```

可以看出`eden`区内存几乎已经被分配完全（即使程序什么也不做，新生代也会使用至少几M内存）。**假如我们再为`allocation2`分配内存会出现什么情况呢？**

```java
//添加运行JVM参数： -XX:+PrintGCDetails
public class GCTest {
   public static void main(String[] args) throws InterruptedException {
      byte[] allocation1, allocation2/*, allocation3, allocation4, allocation5, allocation6*/;
      allocation1 = new byte[60000*1024];

      allocation2 = new byte[8000*1024];

      /*allocation3 = new byte[1000*1024];
      allocation4 = new byte[1000*1024];
      allocation5 = new byte[1000*1024];
      allocation6 = new byte[1000*1024];*/
   }
}

运行结果：
[GC (Allocation Failure) [PSYoungGen: 65253K->936K(76288K)] 65253K->60944K(251392K), 0.0279083 secs] [Times: user=0.13 sys=0.02, real=0.03 secs] 
Heap
 PSYoungGen      total 76288K, used 9591K [0x000000076b400000, 0x0000000774900000, 0x00000007c0000000)
  eden space 65536K, 13% used [0x000000076b400000,0x000000076bc73ef8,0x000000076f400000)
  from space 10752K, 8% used [0x000000076f400000,0x000000076f4ea020,0x000000076fe80000)
  to   space 10752K, 0% used [0x0000000773e80000,0x0000000773e80000,0x0000000774900000)
 ParOldGen       total 175104K, used 60008K [0x00000006c1c00000, 0x00000006cc700000, 0x000000076b400000)
  object space 175104K, 34% used [0x00000006c1c00000,0x00000006c569a010,0x00000006cc700000)
 Metaspace       used 3342K, capacity 4496K, committed 4864K, reserved 1056768K
  class space    used 361K, capacity 388K, committed 512K, reserved 1048576K
```

**解释一下为什么会出现这种情况：** 因为给`allocation2`分配内存的时候`eden`区内存几乎已经被分配完了，我们刚刚讲了当`Eden`区没有足够空间进行分配时，虚拟机将发起一次`Minor GC`，GC期间虚拟机又发现`allocation1`无法存入`Survior`空间，所以只好把新生代的对象**提前转移到老年代**中去，老年代上的空间足够存放`allocation1`，所以不会出现`Full GC`。执行`Minor GC`后，后面分配的对象如果能够存在`eden`区的话，还是会在`eden`区分配内存。可以执行如下代码验证：

```java
public class GCTest {
   public static void main(String[] args) throws InterruptedException {
      byte[] allocation1, allocation2, allocation3, allocation4, allocation5, allocation6;
      allocation1 = new byte[60000*1024];

      allocation2 = new byte[8000*1024];

      allocation3 = new byte[1000*1024];
      allocation4 = new byte[1000*1024];
     allocation5 = new byte[1000*1024];
     allocation6 = new byte[1000*1024];
   }
}

运行结果：
[GC (Allocation Failure) [PSYoungGen: 65253K->952K(76288K)] 65253K->60960K(251392K), 0.0311467 secs] [Times: user=0.08 sys=0.02, real=0.03 secs] 
Heap
 PSYoungGen      total 76288K, used 13878K [0x000000076b400000, 0x0000000774900000, 0x00000007c0000000)
  eden space 65536K, 19% used [0x000000076b400000,0x000000076c09fb68,0x000000076f400000)
  from space 10752K, 8% used [0x000000076f400000,0x000000076f4ee030,0x000000076fe80000)
  to   space 10752K, 0% used [0x0000000773e80000,0x0000000773e80000,0x0000000774900000)
 ParOldGen       total 175104K, used 60008K [0x00000006c1c00000, 0x00000006cc700000, 0x000000076b400000)
  object space 175104K, 34% used [0x00000006c1c00000,0x00000006c569a010,0x00000006cc700000)
 Metaspace       used 3343K, capacity 4496K, committed 4864K, reserved 1056768K
  class space    used 361K, capacity 388K, committed 512K, reserved 1048576K
```

#### 大对象直接进入老年代

**大对象**就是需要大量连续内存空间的对象（比如：字符串、数组）。JVM参数 `-XX:PretenureSizeThreshold` 可以设置大对象的大小，如果对象超过设置大小会直接进入老年代，不会进入年轻代，这个参数只在 `Serial` 和 `ParNew` 两个收集器下有效。

比如设置JVM参数：`-XX:PretenureSizeThreshold=1000000` (单位是字节)  `-XX:+UseSerialGC`  ，再执行下上面的第一个程序会发现大对象直接进了老年代

> **大对象直接进入老年代的原因：为了避免为大对象分配内存时的复制操作而降低效率。**

#### 长期存活的对象将进入老年代

既然虚拟机采用了**分代收集**的思想来管理内存，那么内存回收时就必须能识别哪些对象应放在新生代，哪些对象应放在老年代中。为了做到这一点，虚拟机给每个对象一个**对象年龄（Age）**计数器。

如果对象在 `Eden` 出生并经过第一次` Minor GC` 后仍然能够存活，并且能被 `Survivor` 容纳的话，将被移动到 `Survivor` 空间中，并将对象年龄设为1。对象在 `Survivor` 中每熬过一次 `Minor GC`，年龄就增加1岁，当它的年龄增加到一定程度（默认为15岁，`CMS`收集器默认6岁，不同的垃圾收集器会略微有点不同），就会被晋升到老年代中。对象晋升到老年代的年龄阈值，可以通过参数 **`-XX:MaxTenuringThreshold`** 来设置。

#### 对象动态年龄判断

当前放对象的`Survivor`区域里(其中一块区域，放对象的那块s区)，一批对象的总大小大于这块`Survivor`区域内存大小的50%(`-XX:TargetSurvivorRatio`可以指定)，那么此时**大于等于**这批对象年龄最大值的对象，就可以**直接进入老年代**了，例如`Survivor`区域里现在有一批对象，年龄1+年龄2+年龄n的多个年龄对象总和超过了`Survivor`区域的50%，此时就会把年龄n(含)以上的对象都放入老年代。

这个规则其实是希望那些可能是长期存活的对象，尽早进入老年代。**对象动态年龄判断机制一般是在`minor gc`之后触发的。**

#### 老年代空间分配担保机制

年轻代每次`minor gc`之前JVM都会计算下老年代**剩余可用空间**

如果这个可用空间小于年轻代里现有的所有对象大小之和(**包括垃圾对象**)

就会看一个`-XX:-HandlePromotionFailure`(jdk1.8默认就设置了)的参数是否设置了

如果有这个参数，就会看看老年代的可用内存大小，是否大于之前每一次`minor gc`后进入老年代的对象的**平均大小**。

如果上一步结果是小于或者之前说的参数没有设置，那么就会触发一次`full gc`，对老年代和年轻代一起回收一次垃圾，如果回收完还是没有足够空间存放新的对象就会发生`OOM`

当然，如果`minor gc`之后剩余存活的需要挪动到老年代的对象大小还是大于老年代可用空间，那么也会触发`full gc`，`full gc`完之后如果还是没有空间放`minor gc`之后的存活对象，则也会发生`OOM`

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/123319.png)

### 对象内存回收

堆中几乎放着所有的对象实例，对堆垃圾回收前的第一步就是要判断哪些对象已经死亡（即不能再被任何途径使用的对象）。

#### 引用计数法

给对象中添加一个引用计数器，每当有一个地方引用它，计数器就加1；当引用失效，计数器就减1；任何时候计数器为0的对象就是不可能再被使用的。

**这个方法实现简单，效率高，但是目前主流的虚拟机中并没有选择这个算法来管理内存，其最主要的原因是它很难解决对象之间相互循环引用的问题。**

所谓对象之间的相互引用问题，如下面代码所示：除了对象`objA`和 `objB` **相互引用**着对方之外，这两个对象之间再无任何引用。但是他们因为互相引用对方，导致它们的引用计数器都不为0，于是引用计数算法无法通知 GC 回收器回收他们。

```java
public class ReferenceCountingGc {
   Object instance = null;

   public static void main(String[] args) {
      ReferenceCountingGc objA = new ReferenceCountingGc();
      ReferenceCountingGc objB = new ReferenceCountingGc();
      objA.instance = objB;
      objB.instance = objA;
      objA = null;
      objB = null;
   }
}
```

#### 可达性分析算法

可达性分析算法用来判定对象是否存活的。这个算法的基本思路就是通过一系列的称为`“GC Roots”`的对象作为起始点，从这些节点开始向下搜索，搜索所走过的路径称为引用链（`Reference Chain`），当一个对象到`GC Roots`没有任何引用链相连时，则证明此对象是不可用的。

**作为`GC Roots`的对象主要包括下面4种**

- 虚拟机栈（栈帧中的本地变量表）：各个线程调用方法堆栈中使用到的参数、局部变量、临时变量等。
- 方法区中类静态变量：java类的引用类型静态变量。

- 方法区中常量：比如：字符串常量池里的引用。
- 本地方法栈中JNI指针：（即一般说的`native`方法）。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2383.png)

#### 常见引用类型

java的引用类型一般分为四种：**强引用**、**软引用**、弱引用、虚引用

**强引用**：普通的变量引用

```java
public static User user = new User();
```

**软引用**：将对象用`SoftReference`软引用类型的对象包裹，正常情况不会被回收，但是GC做完后发现释放不出空间存放新的对象，则会把这些软引用的对象回收掉。**软引用可用来实现内存敏感的高速缓存。**

```java
public static SoftReference<User> user = new SoftReference<User>(new User());
```

软引用在实际中有重要的应用，例如浏览器的后退按钮。按后退时，这个后退时显示的网页内容是重新进行请求还是从缓存中取出呢？这就要看具体的实现策略了。

1. 如果一个网页在浏览结束时就进行内容的回收，则按后退查看前面浏览过的页面时，需要重新构建

2. 如果将浏览过的网页存储到内存中会造成内存的大量浪费，甚至会造成内存溢出

**弱引用**：将对象用`WeakReference`软引用类型的对象包裹，弱引用跟没引用差不多，**GC会直接回收掉**，很少用

```java
public static WeakReference<User> user = new WeakReference<User>(new User());      
```

**虚引用：**虚引用也称为幽灵引用或者幻影引用，它是最弱的一种引用关系，几乎不用

#### finalize()方法

**`finalize()`方法最终判定对象是否存活**：即使在可达性分析算法中不可达的对象，也并非是“非死不可”的，这时候它们暂时处于“缓刑”阶段，要真正宣告一个对象死亡，至少要经历**再次标记过程**。

**标记的前提是对象在进行可达性分析后发现没有与GC Roots相连接的引用链。**

**1. 第一次标记并进行一次筛选。**

筛选的条件是此对象是否有必要执行`finalize()`方法。

当对象没有覆盖`finalize`方法，对象将直接被回收。

**2. 第二次标记**

如果这个对象覆盖了`finalize`方法，`finalize`方法是对象脱逃死亡命运的最后一次机会，如果对象要在`finalize()`中成功拯救自己，只要重新与引用链上的任何的一个对象建立关联即可，譬如把自己赋值给某个类变量或对象的成员变量，那在第二次标记时它将移除出“即将回收”的集合。如果对象这时候还没逃脱，那基本上它就真的被回收了。

> 一个对象的`finalize()`方法只会被执行一次，也就是说通过调用`finalize`方法自我救命的机会就一次。

示例代码：

```java
public class OOMTest {

   public static void main(String[] args) {
      List<Object> list = new ArrayList<>();
      int i = 0;
      int j = 0;
      while (true) {
         list.add(new User(i++, UUID.randomUUID().toString()));
         new User(j--, UUID.randomUUID().toString());
      }
   }
}


//User类需要重写finalize方法
@Override
protected void finalize() throws Throwable {
    OOMTest.list.add(this);
    System.out.println("关闭资源，userid=" + id + "即将被回收");
}
```

`finalize()`方法的运行代价高昂， 不确定性大， 无法保证各个对象的调用顺序， 如今已被官方明确声明为**不推荐使用的语法**。 `finalize()`能做的所有工作， 使用`try-finally`或者其他方式都可以做得更好、更及时， 所以建议大家完全可以忘掉Java语言里面的这个方法。

#### 无用的类

方法区主要回收的是无用的类，那么**如何判断一个类是无用的类呢？**

类需要同时满足下面3个条件才能算是 **“无用的类”** ：

- 该类所有的对象实例都已经被回收，也就是 Java 堆中不存在该类的任何实例。
- 加载该类的 `ClassLoader` 已经被回收。(**条件苛刻**)
- 该类对应的 `java.lang.Class` 对象没有在任何地方被引用，无法在任何地方通过反射访问该类的方法。

## 垃圾收集器

### 垃圾收集算法

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95317.png)

**分代收集理论**

当前虚拟机的垃圾收集都采用分代收集算法，这种算法没有什么新的思想，只是根据对象存活周期的不同将内存分为几块。一般将java堆分为新生代和老年代，这样我们就可以根据各个年代的特点选择合适的垃圾收集算法。

比如在新生代中，每次收集都会有大量对象(近99%)死去，所以可以选择复制算法，只需要付出少量对象的复制成本就可以完成每次垃圾收集。而老年代的对象存活几率是比较高的，而且没有额外的空间对它进行分配担保，所以我们必须选择“标记-清除”或“标记-整理”算法进行垃圾收集。

> “标记-清除”或“标记-整理”算法比复制算法慢10倍以上。

#### 标记-复制算法

为了解决效率问题，“复制”收集算法出现了。它可以将内存分为大小相同的两块，每次使用其中的一块。当这一块的内存使用完后，就将还存活的对象复制到另一块去，然后再把使用的空间一次清理掉。这样就使每次的内存回收都是对内存区间的一半进行回收。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95776.png)

#### 标记-清除算法

算法分为“标记”和“清除”阶段：标记存活的对象， 统一回收所有未被标记的对象(一般选择这种)；也可以反过来，标记出所有需要回收的对象，在标记完成后统一回收所有被标记的对象 。它是最基础的收集算法，比较简单，但是会带来两个明显的问题：

1. **效率问题  (如果需要标记的对象太多，效率不高)**
2. **空间问题（标记清除后会产生大量不连续的碎片）**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/94592.png)

#### 标记-整理算法

根据老年代的特点提出的一种标记算法，标记过程仍然与“标记-清除”算法一样，但后续步骤不是直接对可回收对象回收，而是让所有存活的对象向一端移动，然后直接清理掉端边界以外的内存。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/94590.png)

### 垃圾收集器

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95765.png)

**如果说收集算法是内存回收的方法论，那么垃圾收集器就是内存回收的具体实现。**

虽然我们对各个收集器进行比较，但并非为了挑选出一个最好的收集器。因为直到现在为止还没有最好的垃圾收集器出现，更加没有万能的垃圾收集器，**我们能做的就是根据具体应用场景选择适合自己的垃圾收集器**。

#### 1.Serial收集器

通过参数**(`-XX:+UseSerialGC -XX:+UseSerialOldGC`)**设置

`Serial`（串行）收集器是最基本、历史最悠久的垃圾收集器了。看名字就知道这个收集器是一个单线程收集器了。它的 **“单线程”** 的意义不仅仅意味着它只会使用一条垃圾收集线程去完成垃圾收集工作，更重要的是它在进行垃圾收集工作的时候必须暂停其他所有的工作线程（ **"Stop The World"** ），直到它收集结束。

**新生代采用复制算法，老年代采用标记-整理算法。**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95646.png)

虚拟机的设计者们当然知道`Stop The World`带来的不良用户体验，所以在后续的垃圾收集器设计中停顿时间在不断缩短（仍然还有停顿，寻找最优秀的垃圾收集器的过程仍然在继续）。

`Serial`收集器的优点是**简单而高效（与其他收集器的单线程相比）**。`Serial`收集器由于没有线程交互的开销，自然可以获得很高的单线程收集效率。

**`Serial Old`收集器是`Serial`收集器的老年代版本**，它同样是一个单线程收集器。它主要有两大用途：一种用途是在JDK1.5以及以前的版本中与`Parallel Scavenge`收集器搭配使用，**另一种用途是作为`CMS`收集器的后备方案**。

#### 2.Parallel Scavenge收集器

通过参数**(`-XX:+UseParallelGC(年轻代) -XX:+UseParallelOldGC(老年代)`)**设置

**`Parallel`**收集器其实**就是`Serial`收集器的多线程版本**，除了使用多线程进行垃圾收集外，其余行为（控制参数、收集算法、回收策略等等）和`Serial`收集器类似。**默认的收集线程数跟cpu核数相同**，当然也可以用参数(`-XX:ParallelGCThreads`)指定收集线程数，但是一般不推荐修改。

**`Parallel Scavenge`收集器关注点是吞吐量（高效率的利用CPU）。CMS等垃圾收集器的关注点更多的是用户线程的停顿时间（提高用户体验）。所谓吞吐量就是CPU中用于运行用户代码的时间与CPU总消耗时间的比值。** 

`Parallel Scavenge`收集器提供了很多参数供用户找到最合适的停顿时间或最大吞吐量，如果对于收集器运作不太了解的话，可以选择把内存管理优化交给虚拟机去完成也是一个不错的选择。

**新生代采用复制算法，老年代采用标记-整理算法。**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/78078.png)

**`Parallel Old`收集器是`Parallel Scavenge`收集器的老年代版本**。使用多线程和“标记-整理”算法。在注重吞吐量以及CPU资源的场合，都可以优先考虑 `Parallel Scavenge`收集器和`Parallel Old`收集器(**JDK8默认的新生代和老年代收集器**)。

#### 3.ParNew收集器

通过参数**(`-XX:+UseParNewGC`)**设置

`ParNew`收集器其实**跟`Paralle`l收集器很类似**，区别主要在于它可以和`CMS`收集器配合使用。

**新生代采用复制算法**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/92873.png)

它是许多运行在`Server`模式下的虚拟机的首要选择，除了`Serial`收集器外，只有它能与`CMS`收集器（真正意义上的并发收集器）配合工作。

#### 4.CMS收集器

通过参数**(`-XX:+UseConcMarkSweepGC(old)`)**设置

**`CMS（Concurrent Mark Sweep）`收集器是一种以获取最短回收停顿时间为目标的收集器。它非常符合在注重用户体验的应用上使用，它是`HotSpot`虚拟机第一款真正意义上的并发收集器，它第一次实现了让垃圾收集线程与用户线程（基本上）同时工作。**

从名字中的**`Mark Sweep`**这两个词可以看出，`CMS`收集器是一种 **“标记-清除”算法**实现的，它的运作过程相比于前面几种垃圾收集器来说更加复杂一些。整个过程分为四个步骤：

- **初始标记：** 暂停所有的其他线程(`STW`)，并记录下`gc roots`**直接能引用的对象**，**速度很快**。
- **并发标记：** 并发标记阶段就是从`GC Roots`的直接关联对象开始遍历整个对象图的过程， 这个过程耗时较长但是不需要停顿用户线程， 可以与垃圾收集线程一起并发运行。因为用户程序继续运行，可能会有导致已经标记过的对象状态发生改变。
- **重新标记：** 重新标记阶段就是为了修正并发标记期间因为用户程序继续运行而导致标记产生变动的那一部分对象的标记记录(**主要是处理漏标问题**)，这个阶段的停顿时间一般会比初始标记阶段的时间稍长，远远比并发标记阶段时间短。**主要用到三色标记里的增量更新算法做重新标记。**
- **并发清理：** 开启用户线程，同时GC线程开始对未标记的区域做清扫。这个阶段如果有新增对象会被标记为黑色不做任何处理。
- **并发重置：**重置本次GC过程中的标记数据。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/78070.png)

从它的名字就可以看出它是一款优秀的垃圾收集器，主要优点：**并发收集、低停顿**。但是它有下面几个明显的缺点：

- 对CPU资源敏感（会和服务抢资源）；
- 无法处理**浮动垃圾**(在并发标记和并发清理阶段又产生垃圾，这种浮动垃圾只能等到下一次gc再清理了)；
- 它使用的回收算法-**“标记-清除”算法**会导致收集结束时会有**大量空间碎片**产生，当然通过参数`-XX:+UseCMSCompactAtFullCollection`可以让jvm在执行完标记清除后再做整理
- 执行过程中的不确定性，会存在上一次垃圾回收还没执行完，然后垃圾回收又被触发的情况，**特别是在并发标记和并发清理阶段会出现**，一边回收，系统一边运行，也许没回收完就再次触发`full gc`，也就是"**`concurrent mode failure`**"，**此时会进入`stop the world`，用`serial old`垃圾收集器来回收**

**CMS的相关核心参数**

| 参数名                             | 描述                                                         |
| ---------------------------------- | ------------------------------------------------------------ |
| -XX:+UseConcMarkSweepGC            | 启用CMS                                                      |
| -XX:ConcGCThreads                  | 并发的GC线程数                                               |
| -XX:+UseCMSCompactAtFullCollection | FullGC之后做压缩整理（减少碎片）                             |
| -XX:CMSFullGCsBeforeCompaction     | 多少次FullGC之后压缩一次，默认是0，代表每次FullGC后都会压缩一次 |
| -XX:CMSInitiatingOccupancyFraction | 当老年代使用达到该比例时会触发FullGC（默认是92，这是百分比） |
| -XX:+UseCMSInitiatingOccupancyOnly | 只使用设定的回收阈值(-XX:CMSInitiatingOccupancyFraction设定的值)，如果不指定，JVM仅在第一次使用设定值，后续则会自动调整 |
| -XX:+CMSScavengeBeforeRemark       | 在CMS GC前启动一次minor gc，降低CMS GC标记阶段**(**也会对年轻代一起做标记，如果在minor gc就干掉了很多对垃圾对象，标记阶段就会减少一些标记时间**)**时的开销，一般CMS的GC耗时 80%都在标记阶段 |
| -XX:+CMSParallellnitialMarkEnabled | 表示在初始标记的时候多线程执行，缩短STW                      |
| -XX:+CMSParallelRemarkEnabled      | 在重新标记的时候多线程执行，缩短STW                          |

#### 5.G1收集器

通过**(`-XX:+UseG1GC`)**设置

**G1 (Garbage-First)是一款面向服务器的垃圾收集器，主要针对配备多颗处理器及大容量内存的机器。以极高概率满足GC停顿时间要求的同时,还具备高吞吐量性能特征.**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95353.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95354.png)

G1将Java堆划分为多个大小相等的独立区域（**`Region`**），JVM目标是不超过2048个`Region`(JVM源码里`TARGET_REGION_NUMBER` 定义)，实际可以超过该值，但是不推荐。

一般Region大小等于堆大小除以2048，比如堆大小为4096M，则Region大小为2M，当然也可以用参数"`-XX:G1HeapRegionSize`"手动指定`Region`大小，但是推荐默认的计算方式。

G1保留了年轻代和老年代的概念，但不再是物理隔阂了，它们都是（可以不连续）`Region`的集合。

默认年轻代对堆内存的占比是5%，如果堆大小为4096M，那么年轻代占据200MB左右的内存，对应大概是100个Region，可以通过“`-XX:G1NewSizePercent`”设置新生代初始占比，在系统运行中，JVM会不停的给年轻代增加更多的Region，但是最多新生代的占比不会超过60%，可以通过“`-XX:G1MaxNewSizePercent`”调整。年轻代中的`Eden`和`Survivor`对应的region也跟之前一样，默认`8:1:1`，假设年轻代现在有1000个region，eden区对应800个，s0对应100个，s1对应100个。

一个Region可能之前是年轻代，如果Region进行了垃圾回收，之后可能又会变成老年代，也就是说Region的区域功能可能会动态变化。

G1垃圾收集器对于对象什么时候会转移到老年代跟之前讲过的原则一样，**唯一不同的是对大对象的处理**，G1有专门分配大对象的Region叫**`Humongous`区**，而不是让大对象直接进入老年代的Region中。在G1中，大对象的判定规则就是一个大对象超过了一个Region大小的50%，比如按照上面算的，每个Region是2M，只要一个大对象超过了1M，就会被放入`Humongous`中，而且一个大对象如果太大，可能会横跨多个Region来存放。

`Humongous`区专门存放短期巨型对象，不用直接进老年代，可以节约老年代的空间，避免因为老年代空间不够的GC开销。

`Full GC`的时候除了收集年轻代和老年代之外，也会将`Humongous`区一并回收。

G1收集器一次GC(主要值`Mixed GC`)的运作过程大致分为以下几个步骤：

- **初始标记**（initial mark，STW）：暂停所有的其他线程，并记录下`gc roots`直接能引用的对象，**速度很快** ；

- **并发标记**（Concurrent Marking）：同CMS的并发标记
- **最终标记**（Remark，STW）：同CMS的重新标记
- **筛选回收**（Cleanup，STW）：筛选回收阶段首先对各个Region的**回收价值和成本进行排序**，**根据用户所期望的GC停顿STW时间(可以用JVM参数 `-XX:MaxGCPauseMillis`指定)来制定回收计划**

筛选回收阶段：比如说老年代此时有1000个Region都满了，但是因为根据预期停顿时间，本次垃圾回收可能只能停顿200毫秒，那么通过之前回收成本计算得知，可能回收其中800个Region刚好需要200ms，那么就只会回收800个Region(**Collection Set**，要回收的集合)，尽量把GC导致的停顿时间控制在我们指定的范围内。这个阶段其实也可以做到与用户程序一起并发执行，但是因为只回收一部分Region，时间是用户可控制的，而且停顿用户线程将大幅提高收集效率。

不管是年轻代或是老年代，**回收算法主要用的是复制算法**，**将一个region中的存活对象复制到另一个region中，这种不会像CMS那样回收完因为有很多内存碎片还需要整理一次，G1采用复制算法回收几乎不会有太多内存碎片**。

> CMS回收阶段是跟用户线程一起并发执行的，G1因为内部实现太复杂暂时没实现并发回收，不过到了`ZGC`，`Shenandoah`就实现了并发收集，`Shenandoah`可以看成是G1的升级版本

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95399.png)

**G1收集器在后台维护了一个优先列表，每次根据允许的收集时间，优先选择回收价值最大的Region(这也就是它的名字Garbage-First的由来)，比如一个Region花200ms能回收10M垃圾，另外一个Region花50ms能回收20M垃圾，在回收时间有限情况下，G1当然会优先选择后面这个Region回收**。这种使用Region划分内存空间以及有优先级的区域回收方式，保证了G1收集器在有限时间内可以尽可能高的收集效率。

被视为JDK1.7以上版本Java虚拟机的一个重要进化特征。它具备以下特点：

- **并行与并发**：G1能充分利用CPU、多核环境下的硬件优势，使用多个CPU（CPU或者CPU核心）来缩短`Stop-The-World`停顿时间。部分其他收集器原本需要停顿Java线程来执行GC动作，G1收集器仍然可以通过并发的方式让java程序继续执行。
- **分代收集**：虽然G1可以不需要其他收集器配合就能独立管理整个GC堆，但是还是保留了分代的概念。
- **空间整合**：与CMS的“标记--清理”算法不同，G1从整体来看是基于“**标记整理**”算法实现的收集器；从局部上来看是基于“复制”算法实现的。
- **可预测的停顿**：这是G1相对于CMS的另一个大优势，降低停顿时间是G1 和 CMS 共同的关注点，但G1 除了追求低停顿外，还能建立**可预测的停顿时间模型**，能让使用者明确指定在一个长度为M毫秒的时间片段(通过参数"**`-XX:MaxGCPauseMillis`**"指定)内完成垃圾收集。

毫无疑问， 可以由用户指定期望的停顿时间是G1收集器很强大的一个功能， 设置不同的期望停顿时间， 可使得G1在不同应用场景中取得关注吞吐量和关注延迟之间的最佳平衡。

这里设置的“期望值”必须是符合实际的， 不能异想天开， 毕竟G1是要冻结用户线程来复制对象的， 这个停顿时间再怎么低也得有个限度。 它默认的停顿目标为两百毫秒， 一般来说， 回收阶段占到几十到一百甚至接近两百毫秒都很正常， 但如果我们把停顿时间调得非常低， 譬如设置为二十毫秒， 很可能出现的结果就是由于停顿目标时间太短， 导致每次选出来的回收集只占堆内存很小的一部分， 收集器收集的速度逐渐跟不上分配器分配的速度， 导致垃圾慢慢堆积。 很可能一开始收集器还能从空闲的堆内存中获得一些喘息的时间， 但应用运行时间一长就不行了， 最终占满堆引发`Full GC`反而降低性能， 所以通常把期望停顿时间设置为一两百毫秒或者两三百毫秒会是比较合理的。

##### G1垃圾收集分类

**YoungGC**

`YoungGC`并不是说现有的`Eden`区放满了就会马上触发，G1会计算下现在Eden区回收大概要多久时间，如果回收时间远远小于参数 `-XX:MaxGCPauseMills` 设定的值，那么增加年轻代的`region`，继续给新对象存放，不会马上做`Young GC`，直到下一次`Eden`区放满，G1计算回收时间接近参数 `-XX:MaxGCPauseMills` 设定的值，那么就会触发`Young GC`

**MixedGC**

不是`FullGC`，老年代的堆占有率达到参数(**`-XX:InitiatingHeapOccupancyPercent`**)设定的值则触发，回收所有的Young和部分Old(根据期望的GC停顿时间确定old区垃圾收集的优先顺序)以及**大对象区**，正常情况G1的垃圾收集是先做`MixedGC`，主要使用**复制算法**，需要把各个region中存活的对象拷贝到别的region里去，拷贝过程中如果发现**没有足够的空region**能够承载拷贝对象就会触发一次`Full GC`

**Full GC**

停止系统程序，然后采用单线程进行标记、清理和压缩整理，好空闲出来一批Region来供下一次`MixedGC`使用，这个过程是非常耗时的。(`Shenandoah`优化成多线程收集了)

##### G1收集器参数设置

| 参数                               | 含义                                                         |
| :--------------------------------- | :----------------------------------------------------------- |
| -XX:+UseG1GC                       | 使用G1收集器                                                 |
| -XX:ParallelGCThreads              | 指定GC工作的线程数量                                         |
| -XX:G1HeapRegionSize               | 指定分区大小(1MB~32MB，且必须是2的N次幂)，默认将整堆划分为2048个分区 |
| -XX:MaxGCPauseMillis               | 目标暂停时间(默认200ms)                                      |
| -XX:G1NewSizePercent               | 新生代内存初始空间(默认整堆5%，值配置整数，默认就是百分比)   |
| -XX:G1MaxNewSizePercent            | 新生代内存最大空间                                           |
| -XX:TargetSurvivorRatio            | Survivor区的填充容量(默认50%)，Survivor区域里的一批对象(年龄1+年龄2+年龄n的多个年龄对象)总和超过了Survivor区域的50%，此时就会把年龄n(含)以上的对象都放入老年代 |
| -XX:MaxTenuringThreshold           | 最大年龄阈值(默认15)                                         |
| -XX:InitiatingHeapOccupancyPercent | 老年代占用空间达到整堆内存阈值(默认45%)，则执行新生代和老年代的混合收集(MixedGC)，比如我们之前说的堆默认有2048个region，如果有接近1000个region都是老年代的region，则可能就要触发MixedGC了 |
| -XX:G1MixedGCLiveThresholdPercent  | region中的存活对象低于这个值时才会回收该region，如果超过这个值，存活对象过多，回收的的意义不大。 |
| -XX:G1MixedGCCountTarget           | 在一次回收过程中指定做几次筛选回收(默认8次)，在最后一个筛选回收阶段可以回收一会，然后暂停回收，恢复系统运行，一会再开始回收，这样可以让系统不至于单次停顿时间过长。 |
| -XX:G1HeapWastePercent             | 默认5%，gc过程中空出来的region是否充足阈值，在混合回收的时候，对Region回收都是基于复制算法进行的，都是把要回收的Region里的存活对象放入其他Region，然后这个Region中的垃圾对象全部清理掉，这样的话在回收过程就会不断空出来新的Region，一旦空闲出来的Region数量达到了堆内存的5%，此时就会立即停止混合回收，意味着本次混合回收就结束了。 |

##### G1垃圾收集器优化建议

假设参数 `-XX:MaxGCPauseMills` 设置的值很大，导致系统运行很久才会做年轻代gc，年轻代可能都占用了堆内存的60%了，此时才触发年轻代gc。那么存活下来的对象可能就会很多，此时就会导致`Survivor`区域放不下那么多的对象，就会进入老年代中。

或者是你年轻代gc过后，存活下来的对象过多，导致进入`Survivor`区域后触发了动态年龄判定规则，达到了`Survivor`区域的50%，也会快速导致一些对象进入老年代中。

所以这里核心还是在于调节 `-XX:MaxGCPauseMills` 这个参数的值，在保证他的年轻代gc别太频繁的同时，还得考虑每次gc过后的存活对象有多少，避免存活对象太多快速进入老年代，频繁触发`mixed gc`.

##### G1适合场景

1. 50%以上的堆被存活对象占用
2. 对象分配和晋升的速度变化非常大
3. 垃圾回收时间特别长，超过1秒
4. 8GB以上的堆内存(建议值)
5. 停顿时间是500ms以内

**每秒几十万并发的系统如何优化JVM**

`Kafka`类似的支撑高并发消息系统大家肯定不陌生，对于`kafka`来说，每秒处理几万甚至几十万消息时很正常的，一般来说部署`kafka`需要用大内存机器(比如64G)，也就是说可以给年轻代分配个三四十G的内存用来支撑高并发处理，

这里就涉及到一个问题了，我们以前常说的对于`eden`区的`young gc`是很快的，这种情况下它的执行还会很快吗？很显然，不可能，因为内存太大，处理还是要花不少时间的，假设三四十G内存回收可能最快也要几秒钟，按`kafka`这个并发量放满三四十G的`eden`区可能也就一两分钟吧，那么意味着整个系统每运行一两分钟就会因为`young gc`卡顿几秒钟没法处理新消息，显然是不行的。

对于这种情况如何优化？我们可以使用G1收集器，设置 `-XX:MaxGCPauseMills` 为50ms，假设50ms能够回收三到四个G内存，然后50ms的卡顿其实完全能够接受，用户几乎无感知，那么整个系统就可以在卡顿几乎无感知的情况下一边处理业务一边收集垃圾。

> G1天生就适合大内存机器的JVM运行，可以比较完美的解决大内存垃圾回收时间过长的问题。

#### 6.ZGC收集器

通过参数**(`-XX:+UseZGC`)**设置

ZGC（`The Z Garbage Collector`）是[JDK 11](https://www.zhihu.com/search?q=JDK+11&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"article"%2C"sourceId"%3A"364813270"})中推出的一款追求极致低延迟的垃圾收集器，它曾经设计目标包括：

- **停顿时间不超过10ms（JDK16已经达到不超过1ms）**；
- 停顿时间不会随着堆的大小，或者活跃对象的大小而增加；

- 支持`8MB~4TB`级别的堆，JDK15后已经可以支持16TB。

> 这么去想，如果使用ZGC来做Java项目，像对STW敏感的证券系统，游戏的系统都可以去用Java来做（以前都是C或者C++的市场），所以ZGC的出现就是为了抢占其他语言的市场。

##### ZGC中的内存布局

为了细粒度地控制内存的分配，和G1一样，ZGC将内存划分成小的分区，在ZGC中称为页面（`page`）。

**ZGC中没有分代的概念（新生代、老年代）**，ZGC支持**3种**页面，分别为小页面、中页面和大页面。

1. 小页面指的是2MB的页面空间，当对象大小小于等于256KB时，对象分配在小页面。
2. 中页面指32MB的页面空间，当对象大小在256KB和4M之间，对象分配在中页面。
3. 大页面指受操作系统控制的大页，当对象大于4M，对象分配在大页面。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2394.png)

ZGC对于不同页面回收的策略也不同。**简单地说，小页面优先回收；中页面和大页面则尽量不回收。**

**为什么这么设计？**

标准大页（`huge page`）是`Linux Kernel 2.6`引入的，目的是通过使用大页内存来取代传统的4KB内存页面，以适应越来越大的系统内存，让操作系统可以支持现代硬件架构的大页面容量功能。

`Huge pages` 有两种格式大小： `2MB 和 1GB` 

1. 2MB 页块大小适合用于 GB 大小的内存，是默认的页大小
2. 1GB 页块大小适合用于 TB 级别的内存。

所以ZGC这么设置也是为了适应现代硬件架构的发展，提升性能。

##### NUMA-aware

NUMA对应的有UMA，UMA即**`Uniform Memory Access Architecture`**，NUMA就是`Non Uniform Memory Access Architecture`。UMA表示内存只有一块，所有CPU都去访问这一块内存，那么就会存在竞争问题（争夺内存总线访问权），有竞争就会有锁，有锁效率就会受到影响，而且CPU核心数越多，竞争就越激烈。NUMA的话每个CPU对应有一块内存，且这块内存在主板上离这个CPU是最近的，每个CPU优先访问这块内存，那效率自然就提高了：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95934.png)

服务器的NUMA架构在中大型系统上一直非常盛行，也是高性能的解决方案，尤其在系统延迟方面表现都很优秀。ZGC是能自动感知NUMA架构并充分利用NUMA架构特性的。

##### 颜色指针

`Colored Pointers`：即颜色指针，ZGC的核心设计之一。以前的垃圾回收器的GC信息都保存在对象头中，而ZGC的GC信息保存在指针中。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2382.png)

**为什么有2个mark标记？**

每一个GC周期开始时，会交换使用的标记位，使上次GC周期中修正的已标记状态失效，所有引用都变成未标记。

1. GC周期1：使用`mark0`, 则周期结束所有引用mark标记都会成为01。

2. GC周期2：使用`mark1`, 则期待的mark标记10，所有引用都能被重新标记。

通过对配置ZGC后对象指针分析我们可知，对象指针必须是64位，那么ZGC就无法支持32位操作系统，同样的也就无法支持压缩指针了（`CompressedOops`，压缩指针也是32位）。

**颜色指针的三大优势：**

1. 一旦某个Region的存活对象被移走之后，这个Region立即就能够被释放和重用掉，而不必等待整个堆中所有指向该Region的引用都被修正后才能清理，这使得理论上只要还有一个空闲Region，ZGC就能完成收集。
2. 颜色指针可以大幅减少在垃圾收集过程中内存屏障的使用数量，ZGC只使用了读屏障。
3. 颜色指针具备强大的扩展性，它可以作为一种可扩展的存储结构用来记录更多与对象标记、重定位过程相关的数据，以便日后进一步提高性能。

##### ZGC流程

**一次ZGC流程：**标记阶段(标识垃圾)、转移阶段(对象复制或移动)

- 标记(`mark`):从根集合出发，标记活跃对象；此时内存中存在活跃对象和已死亡对象。

- 转移(`relocate`)：把活跃对象转移（复制）到新的内存上，原来的内存空间可以回收。

- 重定位(`remap`)：因为对象的内存地址发生了变化，所以所有指向对象老地址的指针都要调整到对象新的地址上。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2378.png)

**ZGC标记阶段**

1. **初始标记：**从根集合(`GC Roots`)出发，找出根集合直接引用的活跃对象(根对象)

2. **并发标记：**根据初始标记找到的根对象，使用深度优先遍历对象的成员变量进行标

3. **再标记：**并发标记需要解决标记过程中引用关系变化导致的漏标记问题

###### ZGC并发标记算法

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2387.png)

1. **初始阶段：**在ZGC初始化之后，此时地址视图为`Remapped`，程序正常运行，在内存中分配对象，满足一定条件后垃圾回收启动。

2. **初始标记：**这个阶段需要暂停（STW），初始标记只需要扫描所有`GC Roots`，其处理时间和`GC Roots`的数量成正比，停顿时间不会随着堆的大小或者活跃对象的大小而增加。

3. **并发标记：**这个阶段不需要暂停（没有STW），扫描剩余的所有对象，这个处理时间比较长，所以走并发，业务线程与GC线程同时运行。但是这个阶段会产生漏标问题。

3. **再标记**：这个阶段需要暂停（没有STW），主要处理漏标对象，通过`SATB`算法解决（G1中的解决漏标的方案）。

###### ZGC转移阶段

1. 并发转移准备：分析最有价值GC分页<无STW >

2. 初始转移：转移初始标记的存活对象同时做对象重定位<有STW>

3. 并发转移：对转移并发标记的存活对象做转移<无STW>

**如何做到并发转移？**

转发表(类似于`HashMap`)，对象转移和插转发表做原子操作

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2381.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2379.png)

###### ZGC重定位算法

**并发标记对象的重定位：**下次GC中的并发标记（同时做上次并发标记对象的重定位），技术上：指针着色中M0和M1区分

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2380.png)

##### 读屏障

之前的GC都是采用`Write Barrier`，这次ZGC采用了完全不同的方案读屏障，这个是ZGC一个非常重要的特性。在标记和移动对象的阶段，每次**从堆里对象的引用类型中读取一个指针**的时候，都需要加上一个`Load Barriers`。

- 涉及对象：并发转移但还没做对象重定位的对象（着色指针使用M0和M1可以区分）

- 触发时机：在两次GC之间业务线程访问这样的对象

- 触发操作：对象重定位+删除转发表记录（两个一起做原子操作）

读屏障是JVM向应用代码插入一小段代码的技术。当应用线程从堆中读取对象引用时，就会执行这段代码。需要注意的是，仅“从堆中读取对象引用”才会触发这段代码。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2386-170904456204076.png)

##### ZGC存在的问题

ZGC最大的问题是**浮动垃圾**。ZGC的停顿时间是在10ms以下，但是ZGC的执行时间还是远远大于这个时间的。假如ZGC全过程需要执行10分钟，在这个期间由于对象分配速率很高，将创建大量的新对象，这些对象很难进入当次GC，所以只能在下次GC的时候进行回收，这些只能等到下次GC才能回收的对象就是浮动垃圾。

**解决方案：**目前唯一的办法是增大堆的容量，使得程序得到更多的喘息时间，但是这个也是一个治标不治本的方案。如果需要从根本上解决这个问题，还是需要引入分代收集，让新生对象都在一个专门的区域中创建，然后专门针对这个区域进行更频繁、更快的收集。

> ZGC没有分代概念，每次都需要进行全堆扫描，导致一些“朝生夕死”的对象没能及时的被回收。
>
> 目前ZGC历代版本中存在的一些问题（阿里、腾讯、美团、华为等大厂在支持业务切换 ZGC 的出现的），基本上都已经将遇到的相关问题和修复积极向社区报告和回馈，很多问题在JDK16和JDK17已经修复完善。另外的话，问题相对来说不是非常严重，如果遇到类似的问题可以查看下JVM团队的历代修复日志，同时King老师的建议就是尽量使用比较新的版本来上线，以免重复掉坑里面。

##### ZGC参数设置

ZGC 优势不仅在于其超低的 `STW` 停顿，也在于其参数的简单，绝大部分生产场景都可以自适应。当然，极端情况下，还是有可能需要对 ZGC 个别参数做个调整，大致可以分为三类：

- **堆大小：**`Xmx`。当分配速率过高，超过回收速率，造成堆内存不够时，会触发 `Allocation Stall`，这类 Stall 会减缓当前的用户线程。因此，当我们在 GC 日志中看到 `Allocation Stall`，通常可以认为堆空间偏小或者 `concurrent gc threads` 数偏小。
- **GC 触发时机：**`ZAllocationSpikeTolerance, ZCollectionInterval。ZAllocationSpikeTolerance` 用来估算当前的堆内存分配速率，在当前剩余的堆内存下，`ZAllocationSpikeTolerance` 越大，估算的达到 `OOM` 的时间越快，ZGC 就会更早地进行触发 GC。`ZCollectionInterval` 用来指定 GC 发生的间隔，以秒为单位触发 GC。

- **GC 线程：`**ParallelGCThreads， ConcGCThreads。ParallelGCThreads` 是设置 STW 任务的 GC 线程数目，默认为 CPU 个数的 60%；`ConcGCThreads` 是并发阶段 GC 线程的数目，默认为 CPU 个数的 12.5%。增加 GC 线程数目，可以加快 GC 完成任务，减少各个阶段的时间，但也会增加 CPU 的抢占开销，可根据生产情况调整。

> 由上可以看出 ZGC 需要调整的参数十分简单，通常设置 `Xmx` 即可满足业务的需求，大大减轻 Java 开发者的负担。

##### ZGC触发时机

ZGC目前有4中机制触发GC：

- 定时触发，默认为不使用，可通过`ZCollectionInterval`参数配置。
- 预热触发，最多三次，在堆内存达到10%、20%、30%时触发，主要是统计GC时间，为其他GC机制使用。
- 分配速率，基于正态分布统计，计算内存99.9%可能的最大分配速率，以及此速率下内存将要耗尽的时间点，在耗尽之前触发GC（耗尽时间 - 一次GC最大持续时间 - 一次GC检测周期时间）。
- 主动触发，（默认开启，可通过`ZProactive`参数配置） 距上次GC堆内存增长10%，或超过5分钟时，对比距上次GC的间隔时间跟（49 * 一次GC的最大持续时间），超过则触发。

##### ZGC典型应用场景

对于性能来说，不同的配置对性能的影响是不同的，如充足的内存下即大堆场景，ZGC 在各类 `Benchmark` 中能够超过 G1 大约 5% 到 20%，而在小堆情况下，则要低于 G1 大约 10%；不同的配置对于应用的影响不尽相同，开发者需要根据使用场景来合理判断。

当前 ZGC 不支持压缩指针和分代 GC，其内存占用相对于 G1 来说要稍大，在小堆情况下较为明显，而在大堆情况下，这些多占用的内存则显得不那么突出。**因此，以下两类应用强烈建议使用 ZGC 来提升业务体验：**

- 超大堆应用。超大堆（百 G 以上）下，CMS 或者 G1 如果发生 Full GC，停顿会在分钟级别，可能会造成业务的终端，强烈推荐使用 ZGC。
- 当业务应用需要提供高服务级别协议（`Service Level Agreement，SLA`），例如 99.99% 的响应时间不能超过 100ms，此类应用无论堆大小，均推荐采用低停顿的 ZGC。

#### 选择垃圾收集器

1. 优先调整堆的大小让服务器自己来选择
2. 如果内存小于100M，使用串行收集器
3. 如果是单核，并且没有停顿时间的要求，串行或JVM自己选择
4. 如果允许停顿时间超过1秒，选择并行或者JVM自己选
5. 如果响应时间最重要，并且不能超过1秒，使用并发收集器
6. **4G以下可以用`parallel`，4-8G可以用`ParNew+CMS`，8G以上可以用G1，几百G以上用ZGC**

**下图有连线的可以搭配使用**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95881.png)

> **JDK 1.8默认使用 Parallel(年轻代和老年代都是)**
>
> **JDK 1.9默认使用 G1**

#### 安全点与安全区域

**安全点**就是指代码中一些特定的位置,当线程运行到这些位置时它的状态是确定的,这样JVM就可以安全的进行一些操作,比如GC等，所以GC不是想什么时候做就立即触发的，是需要等待所有线程运行到安全点后才能触发。

这些特定的安全点位置主要有以下几种:

1. 方法返回之前
2. 调用某个方法之后
3. 抛出异常的位置
4. 循环的末尾

> 大体实现思想是当垃圾收集需要中断线程的时候， 不直接对线程操作， 仅仅简单地设置一个标志位， 各个线程执行过程时会不停地主动去轮询这个标志， 一旦发现中断标志为真时就自己在最近的安全点上主动中断挂起。 轮询标志的地方和安全点是重合的。

**安全区域又是什么？**

`Safe Point` 是对正在执行的线程设定的。如果一个线程处于 Sleep 或中断状态，它就不能响应 JVM 的中断请求，再运行到 `Safe Point` 上。因此 JVM 引入了 `Safe Region`。

`Safe Region` 是指在一段代码片段中，**引用关系不会发生变化**。在这个区域内的任意地方开始 GC 都是安全的。

### 亿级流量电商系统如何优化JVM参数设置(ParNew+CMS)

大型电商系统后端现在一般都是拆分为多个子系统部署的，比如，商品系统，库存系统，订单系统，促销系统，会员系统等等。这里以比较核心的订单系统为例 

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/78582.png)

**对于8G内存，我们一般是分配4G内存给JVM，正常的JVM参数配置如下：**

```sh
-Xms3072M -Xmx3072M -Xss1M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:SurvivorRatio=8
```

上节说过，这样设置可能会由于**动态对象年龄判断原则**导致频繁`full gc`。

于是我们可以更新下JVM参数设置：

```sh
-Xms3072M -Xmx3072M -Xmn2048M -Xss1M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:SurvivorRatio=8
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/78583.png)

这样就降低了因为对象动态年龄判断原则导致的对象频繁进入老年代的问题，其实**很多优化无非就是让短期存活的对象尽量都留在`survivor`里，不要进入老年代，这样在`minor gc`的时候这些对象都会被回收，不会进到老年代从而导致`full gc`**。

对于对象年龄应该为多少才移动到老年代比较合适，本例中一次`minor gc`要间隔二三十秒，大多数对象一般在几秒内就会变为垃圾，完全可以将默认的15岁改小一点，比如改为5，那么意味着对象要经过5次`minor gc`才会进入老年代，整个时间也有一两分钟了，如果对象这么长时间都没被回收，完全可以认为这些对象是会存活的比较长的对象，可以移动到老年代，而不是继续一直占用`survivor`区空间。

对于多大的对象直接进入老年代(参数`-XX:PretenureSizeThreshold`)，这个一般可以结合系统看下有没有什么大对象生成，预估下大对象的大小，一般来说设置为`1M`就差不多了，很少有超过1M的大对象，这些对象一般就是你系统初始化分配的缓存对象，比如大的缓存`List，Map`之类的对象。

可以适当调整JVM参数如下：

```sh
-Xms3072M -Xmx3072M -Xmn2048M -Xss1M  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:SurvivorRatio=8  -XX:MaxTenuringThreshold=5 -XX:PretenureSizeThreshold=1M
```

对于JDK8默认的垃圾回收器是`-XX:+UseParallelGC`(年轻代)和`-XX:+UseParallelOldGC`(老年代)

如果内存较大(超过4个G，只是经验值)，系统对停顿时间比较敏感，我们可以使用`ParNew+CMS(-XX:+UseParNewGC -XX:+UseConcMarkSweepGC)`

对于老年代CMS的参数如何设置我们可以思考下，首先我们想下当前这个系统有哪些对象可能会长期存活躲过5次以上`minor gc`最终进入老年代。

无非就是那些`Spring`容器里的`Bean`，线程池对象，一些初始化缓存数据对象等，这些加起来充其量也就几十MB。

还有就是某次`minor gc`完了之后还有超过一两百M的对象存活，那么就会直接进入老年代，比如突然某一秒瞬间要处理五六百单，那么每秒生成的对象可能有一百多M，再加上整个系统可能压力剧增，一个订单要好几秒才能处理完，下一秒可能又有很多订单过来。

我们可以估算下大概每隔五六分钟出现一次这样的情况，那么大概半小时到一小时之间就可能因为老年代满了触发一次`Full GC`，`Full GC`的触发条件还有我们之前说过的**老年代空间分配担保机制**，历次的`minor gc`挪动到老年代的对象大小肯定是非常小的，所以几乎不会在`minor gc`触发之前由于老年代空间分配担保失败而产生`full gc`，其实在半小时后发生`full gc`，这时候已经过了抢购的最高峰期，后续可能几小时才做一次`Full GC`。

对于碎片整理，因为都是1小时或几小时才做一次`Full GC`是可以每做完一次就开始碎片整理，或者两到三次之后再做一次也行。

综上，只要年轻代参数设置合理，老年代CMS的参数设置基本都可以用默认值，如下所示：

```sh
-Xms3072M -Xmx3072M -Xmn2048M -Xss1M  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M  -XX:SurvivorRatio=8  -XX:MaxTenuringThreshold=5 -XX:PretenureSizeThreshold=1M -XX:+UseParNewGC -XX:+UseConcMarkSweepGC  -XX:CMSInitiatingOccupancyFraction=92 -XX:+UseCMSCompactAtFullCollection -XX:CMSFullGCsBeforeCompaction=3
```

### 垃圾收集底层算法实现

#### 三色标记

**在并发标记的过程中，因为标记期间应用线程还在继续跑，对象间的引用可能发生变化，多标和漏标的情况就有可能发生。漏标的问题主要引入了三色标记算法来解决。**

**三色标记算法是把`gc roots`可达性分析遍历对象过程中遇到的对象， 按照“是否访问过”这个条件标记成以下三种颜色：**

- **黑色**： 表示对象已经被垃圾收集器访问过， 且这个对象的所有引用都已经扫描过。 黑色的对象代表已经扫描过， 它是安全存活的， 如果有其他对象引用指向了黑色对象， 无须重新扫描一遍。 黑色对象不可能直接（不经过灰色对象） 指向某个白色对象。

- **灰色**： 表示对象已经被垃圾收集器访问过， 但这个对象上至少存在一个引用还没有被扫描过。

- **白色**： 表示对象尚未被垃圾收集器访问过。 显然在可达性分析刚刚开始的阶段， 所有的对象都是白色的， 若在分析结束的阶段， 仍然是白色的对象， 即代表不可达。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95383.png)

 ```java
 /**
  * 垃圾收集算法细节之三色标记
  * 为了简化例子，代码写法可能不规范，请忽略
  * Created by 诸葛老师
  */
 public class ThreeColorRemark {
 
     public static void main(String[] args) {
         A a = new A();
         //开始做并发标记
         D d = a.b.d;   // 1.读
         a.b.d = null;  // 2.写
         a.d = d;       // 3.写
     }
 }
 
 class A {
     B b = new B();
     D d = null;
 }
 
 class B {
     C c = new C();
     D d = new D();
 }
 
 class C {
 }
 
 class D {
 }
 ```

#### 多标-浮动垃圾

在并发标记过程中，如果由于方法运行结束导致部分局部变量(`gcroot`)被销毁，这个`gcroot`引用的对象之前又被扫描过(被标记为非垃圾对象)，那么本轮GC不会回收这部分内存。这部分本应该回收但是没有回收到的内存，被称之为“**浮动垃圾**”。浮动垃圾并不会影响垃圾回收的正确性，只是需要等到下一轮垃圾回收中才被清除。

另外，**针对并发标记(还有并发清理)开始后产生的新对象，通常的做法是直接全部当成黑色**，本轮不会进行清除。这部分对象期间可能也会变为垃圾，这也算是浮动垃圾的一部分。

#### 漏标-读写屏障

漏标会导致被引用的对象被当成垃圾误删除，这是**严重bug，必须解决**，有两种解决方案： **增量更新（Incremental Update） 和原始快照（Snapshot At The Beginning，SATB） 。**

**增量更新**就是当黑色对象插入新的指向白色对象的引用关系时， 就将这个新插入的引用记录下来， 等并发扫描结束之后， 再将这些记录过的引用关系中的黑色对象为根， 重新扫描一次。 这可以简化理解为， **黑色对象一旦新插入了指向白色对象的引用之后， 它就变回灰色对象了**。

**原始快照**就是当灰色对象要删除指向白色对象的引用关系时， 就将这个要删除的引用记录下来， 在并发扫描结束之后， 再将这些记录过的引用关系中的灰色对象为根， 重新扫描一次，这样就能扫描到白色的对象，将白色对象直接标记为黑色(**目的就是让这种对象在本轮gc清理中能存活下来，待下一轮gc的时候重新扫描，这个对象也有可能是浮动垃圾**)

以上无论是对引用关系记录的插入还是删除， 虚拟机的记录操作都是通过**写屏障**实现的。 

##### 写屏障

给某个对象的成员变量赋值时，其底层代码大概长这样：

```c++
/**
* @param field 某对象的成员变量，如 a.b.d 
* @param new_value 新值，如 null
*/
void oop_field_store(oop* field, oop new_value) { 
    *field = new_value; // 赋值操作
} 
```

所谓的写屏障，其实就是指在赋值操作前后，加入一些处理（可以参考AOP的概念）：

 ```c++
 void oop_field_store(oop* field, oop new_value) {  
     pre_write_barrier(field);          // 写屏障-写前操作
     *field = new_value; 
     post_write_barrier(field, value);  // 写屏障-写后操作
 }
 ```

##### 写屏障实现SATB

当对象B的成员变量的引用发生变化时，比如引用消失（`a.b.d = null`），我们可以利用写屏障，将B**原来成员变量的引用**对象D记录下来：

```c++
void pre_write_barrier(oop* field) {
    oop old_value = *field;    // 获取旧值
    remark_set.add(old_value); // 记录原来的引用对象
}
```

##### 写屏障实现增量更新

当对象A的成员变量的引用发生变化时，比如新增引用（`a.d = d`），我们可以利用写屏障，将A**新的成员变量引用**对象D记录下来：

```c++
void post_write_barrier(oop* field, oop new_value) {  
    remark_set.add(new_value);  // 记录新引用的对象
}
```

#### 读屏障

```c++
void post_write_barrier(oop* field, oop new_value) {  
    remark_set.add(new_value);  // 记录新引用的对象
}
```

读屏障是直接针对第一步：`D d = a.b.d`，当读取成员变量时，一律记录下来：

```c++
void pre_load_barrier(oop* field) {  
    oop old_value = *field;
    remark_set.add(old_value); // 记录读取到的对象
}
```

现代追踪式（可达性分析）的垃圾回收器几乎都借鉴了三色标记的算法思想，尽管实现的方式不尽相同：比如白色/黑色集合一般都不会出现（但是有其他体现颜色的地方）、灰色集合可以通过栈/队列/缓存日志等方式进行实现、遍历方式可以是广度/深度遍历等等。

对于读写屏障，以`Java HotSpot VM`为例，其并发标记时对漏标的处理方案如下：

- **CMS：写屏障 + 增量更新**
- **G1，Shenandoah：写屏障 + SATB**
- **ZGC：读屏障**

工程实现中，读写屏障还有其他功能，比如写屏障可以用于**记录跨代/区引用的变化**，读屏障可以用于**支持移动对象的并发执行**等。功能之外，还有性能的考虑，所以对于选择哪种，每款垃圾回收器都有自己的想法。

**为什么G1用SATB？CMS用增量更新？**

> SATB相对增量更新效率会高(当然SATB可能造成更多的浮动垃圾)，因为不需要在重新标记阶段再次深度扫描被删除引用对象，而CMS对增量引用的根对象会做深度扫描
>
> G1因为很多对象都位于不同的region，CMS就一块老年代区域，重新深度扫描对象的话G1的代价会比CMS高，所以G1选择SATB不深度扫描对象，只是简单标记，等到下一轮GC再深度扫描。

### 记忆集与卡表

在新生代做`GCRoots`可达性扫描过程中可能会碰到跨代引用的对象，这种如果又去对老年代再去扫描效率太低了。

为此，在新生代可以引入记录集（**Remember Set**）的数据结构（记录从非收集区到收集区的指针集合），避免把整个老年代加入`GCRoots`扫描范围。事实上并不只是新生代、 老年代之间才有跨代引用的问题， 所有涉及部分区域收集（`Partial GC`） 行为的垃圾收集器， 典型的如`G1、ZGC、Shenandoah`收集器， 都会面临相同的问题。

垃圾收集场景中，收集器只需通过记忆集判断出某一块非收集区域是否存在指向收集区域的指针即可，无需了解跨代引用指针的全部细节。

`hotspot`使用一种叫做“卡表”(**Cardtable**)的方式实现记忆集，也是目前最常用的一种方式。关于卡表与记忆集的关系， 可以类比为Java语言中`HashMap`与Map的关系。

卡表是使用一个字节数组实现：`CARD_TABLE[ ]`，每个元素对应着其标识的内存区域一块特定大小的内存块，称为“卡页”。

`hotSpot`使用的卡页是2^9大小，即512字节

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/95719.png)

一个卡页中可包含多个对象，只要有一个对象的字段存在跨代指针，其对应的卡表的元素标识就变成1，表示该元素变脏，否则为0。GC时，只要筛选本收集区的卡表中变脏的元素加入`GCRoots`里。

**卡表的维护**

卡表变脏上面已经说了，但是需要知道如何让卡表变脏，即发生引用字段赋值时，如何更新卡表对应的标识为1。`Hotspot`使用**写屏障**维护卡表状态。

## JVM调优实践

**前置启动程序**

事先启动一个web应用程序，用jps查看其进程id，接着用各种jdk自带命令优化应用

### Jmap

此命令可以用来查看内存信息，实例个数以及占用内存大小

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96322.png)

```sh
jmap -histo 14660  #查看历史生成的实例
jmap -histo:live 14660  #查看当前存活的实例，执行过程中可能会触发一次full gc
```

打开log.txt，文件内容如下：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96302.png)

| 参数 | 含义 |
| --- | --- |
| num | 序号 |
| instances | 实例数量 |
| bytes | 占用空间大小 |
| class name | 类名称，`[C is a char[]，[S is a short[]，[I is a int[]，[B is a byte[]，[[I is a int`[][] |

堆信息

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96304.png)

堆内存dump

```sh
jmap -dump:format=b,file=eureka.hprof 14660
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96320.png)

也可以设置内存溢出自动导出dump文件(内存很大的时候，可能会导不出来)

1. `-XX:+HeapDumpOnOutOfMemoryError`
2. `-XX:HeapDumpPath=./  （路径）`

示例代码：

```java
public class OOMTest {

   public static List<Object> list = new ArrayList<>();

   // JVM设置    
   // -Xms10M -Xmx10M -XX:+PrintGCDetails -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=D:\jvm.dump 
   public static void main(String[] args) {
      List<Object> list = new ArrayList<>();
      int i = 0;
      int j = 0;
      while (true) {
         list.add(new User(i++, UUID.randomUUID().toString()));
         new User(j--, UUID.randomUUID().toString());
      }
   }
}
```

**可以用`jvisualvm`命令工具导入该dump文件分析**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96300.png)

### Jstack

用`jstack`加进程id查找死锁，见如下示例

```java
public class DeadLockTest {

   private static Object lock1 = new Object();
   private static Object lock2 = new Object();

   public static void main(String[] args) {
      new Thread(() -> {
         synchronized (lock1) {
            try {
               System.out.println("thread1 begin");
               Thread.sleep(5000);
            } catch (InterruptedException e) {
            }
            synchronized (lock2) {
               System.out.println("thread1 end");
            }
         }
      }).start();

      new Thread(() -> {
         synchronized (lock2) {
            try {
               System.out.println("thread2 begin");
               Thread.sleep(5000);
            } catch (InterruptedException e) {
            }
            synchronized (lock1) {
               System.out.println("thread2 end");
            }
         }
      }).start();

      System.out.println("main thread end");
   }
}
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96306.png)

| 属性            | 值                              |
| --------------- | ------------------------------- |
| 线程名          | "Thread-1"                      |
| 优先级          | prio=5                          |
| 线程id          | tid=0x000000001fa9e000          |
| 本地线程标识nid | nid=0x2d64                      |
| 线程状态        | java.lang.Thread.State: BLOCKED |

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96308.png)

还可以用`jvisualvm`自动检测死锁

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96309.png)

**远程连接`jvisualvm`**

**启动普通的jar程序JMX端口配置：**

```java
java -Dcom.sun.management.jmxremote.port=8888 -Djava.rmi.server.hostname=192.168.65.60 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false -jar microservice-eureka-server.jar
/**
 *-Dcom.sun.management.jmxremote.port 为远程机器的JMX端口
 *-Djava.rmi.server.hostname 为远程机器IP
**/
```

**tomcat的JMX配置：在`catalina.sh`文件里的最后一个`JAVA_OPTS`的赋值语句下一行增加如下配置行**

```sh
JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=8888 -Djava.rmi.server.hostname=192.168.50.60 -Dcom.sun.management.jmxremote.ssl=false -Dcom.sun.management.jmxremote.authenticate=false"
```

连接时确认下端口是否通畅，可以临时关闭下防火墙

```sh
systemctl stop firewalld   #临时关闭防火墙
```

#### 找出占用cpu最高的线程堆栈信息

```java
package com.tuling.jvm;

/**
 * 运行此代码，cpu会飙高
 */
public class Math {

    public static final int initData = 666;
    public static User user = new User();

    public int compute() {  //一个方法对应一块栈帧内存区域
        int a = 1;
        int b = 2;
        int c = (a + b) * 10;
        return c;
    }

    public static void main(String[] args) {
        Math math = new Math();
        while (true){
            math.compute();
        }
    }
}
```

1. 使用命令`top -p`  ，显示你的java进程的内存情况，pid是java进程号，比如19663

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96310.png)

2. 按`H`，获取每个线程的内存情况 

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96324.png)

3. 找到内存和cpu占用最高的线程`tid`，比如19664

4. 转为十六进制得到 `0x4cd0`，此为线程id的十六进制表示

5. 执行 `jstack 19663|grep -A 10 4cd0`，得到线程堆栈信息中 `4cd0` 这个线程所在行的后面10行，从堆栈中可以发现导致cpu飙高的调用方法

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96326.png)

6. 查看对应的堆栈信息找出可能存在问题的代码

### Jinfo

查看正在运行的Java应用程序的扩展参数 ，查看jvm的参数

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96331.png)

查看java系统参数

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96333.png)

### Jstat

`jstat`命令可以查看堆内存各部分的使用量，以及加载类的数量。命令的格式如下：

```sh
jstat [-命令选项] [vmid] [间隔时间(毫秒)] [查询次数]
# 注意：下面使用的jdk版本是jdk8
```

#### 垃圾回收统计

`jstat -gc pid` **最常用**，可以评估程序内存使用及GC压力整体情况

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96314.png)

| 指标 | 描述                          |
| ---- | ----------------------------- |
| S0C  | 第一个幸存区的大小，单位KB    |
| S1C  | 第二个幸存区的大小            |
| S0U  | 第一个幸存区的使用大小        |
| S1U  | 第二个幸存区的使用大小        |
| EC   | 伊甸园区的大小                |
| EU   | 伊甸园区的使用大小            |
| OC   | 老年代大小                    |
| OU   | 老年代使用大小                |
| MC   | 方法区大小(元空间)            |
| MU   | 方法区使用大小                |
| CCSC | 压缩类空间大小                |
| CCSU | 压缩类空间使用大小            |
| YGC  | 年轻代垃圾回收次数            |
| YGCT | 年轻代垃圾回收消耗时间，单位S |
| FGC  | 老年代垃圾回收次数            |
| FGCT | 老年代垃圾回收消耗时间，单位S |
| GCT  | 垃圾回收消耗总时间，单位S     |

#### 堆内存统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96312.png)

| 指标  | 描述               |
| ----- | ------------------ |
| NGCMN | 新生代最小容量     |
| NGCMX | 新生代最大容量     |
| NGC   | 当前新生代容量     |
| OGCMN | 老年代最小容量     |
| OGCMX | 老年代最大容量     |
| OGC   | 当前老年代大小     |
| MCMN  | 最小元数据容量     |
| MCMX  | 最大元数据容量     |
| CCSMN | 最小压缩类空间大小 |
| CCSMX | 最大压缩类空间大小 |

#### 新生代垃圾回收统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96317.png)

| 指标 | 描述                       |
| ---- | -------------------------- |
| TT   | 对象在新生代存活的次数     |
| MTT  | 对象在新生代存活的最大次数 |
| DSS  | 期望的幸存区大小           |

#### 新生代内存统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96315.png)

| 指标  | 描述               |
| ----- | ------------------ |
| S0CMX | 最大幸存1区大小    |
| S1CMX | 最大幸存2区大小    |
| ECMX  | 最大伊甸园区大小   |

#### 老年代垃圾回收统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96319.png)

#### 老年代内存统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96318.png)

#### 元数据空间统计

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96316.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96321.png)

| 指标 | 描述                   |
| ---- | ---------------------- |
| S0   | 幸存1区当前使用比例    |
| S1   | 幸存2区当前使用比例    |
| E    | 伊甸园区使用比例       |
| O    | 老年代使用比例         |
| M    | 元数据区使用比例       |
| CCS  | 压缩使用比例           |

### JVM运行情况预估

用 `jstat gc -pid` 命令可以计算出如下一些关键数据，有了这些数据就可以采用之前介绍过的优化思路，先给自己的系统设置一些初始性的JVM参数，比如堆内存大小，年轻代大小，`Eden`和`Survivor`的比例，老年代的大小，大对象的阈值，大龄对象进入老年代的阈值等。

**年轻代对象增长的速率**

可以执行命令` jstat -gc pid 1000 10` (每隔1秒执行1次命令，共执行10次)，通过观察EU(`eden`区的使用)来估算每秒`eden`大概新增多少对象，如果系统负载不高，可以把频率1秒换成1分钟，甚至10分钟来观察整体情况。

> 一般系统可能有高峰期和日常期，所以需要在不同的时间分别估算不同情况下对象增长速率。

**`Young GC`的触发频率和每次耗时**

知道年轻代对象增长速率我们就能推根据`eden`区的大小推算出`Young GC`大概多久触发一次，`Young GC`的平均耗时可以通过 `YGCT/YGC` 公式算出，根据结果我们大概就能知道**系统大概多久会因为`Young GC`的执行而卡顿多久。**

**每次`Young GC`后有多少对象存活和进入老年代**

这个因为之前已经大概知道`Young GC`的频率，假设是每5分钟一次，那么可以执行命令 `jstat -gc pid 300000 10` ，观察每次结果`eden`，`survivor`和老年代使用的变化情况，在每次gc后`eden`区使用一般会大幅减少，`survivor`和老年代都有可能增长，这些增长的对象就是每次`Young GC`后存活的对象，同时还可以看出每次`Young GC`后进去老年代大概多少对象，从而可以推算出**老年代对象增长速率。**

**`Full GC`的触发频率和每次耗时**

知道了老年代对象的增长速率就可以推算出`Full GC`的触发频率了，`Full GC`的每次耗时可以用公式 `FGCT/FGC` 计算得出。

**优化思路**：其实简单来说就是尽量让每次`Young GC`后的存活对象小于`Survivor`区域的50%，都留存在年轻代里。尽量别让对象进入老年代。尽量减少`Full GC`的频率，避免频繁`Full GC`对JVM性能的影响。

**系统频繁Full GC导致系统卡顿是怎么回事**

- 机器配置：2核4G
- JVM内存大小：2G
- 系统运行时间：7天
- 期间发生的`Full GC`次数和耗时：500多次，200多秒
- 期间发生的`Young GC`次数和耗时：1万多次，500多秒

大致算下来每天会发生70多次`Full GC`，平均每小时3次，每次`Full GC`在400毫秒左右；

每天会发生1000多次`Young GC`，每分钟会发生1次，每次`Young GC`在50毫秒左右。

JVM参数设置如下：

```sh
-Xms1536M -Xmx1536M -Xmn512M -Xss256K -XX:SurvivorRatio=6  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M  -XX:+UseParNewGC  -XX:+UseConcMarkSweepGC  -XX:CMSInitiatingOccupancyFraction=75 -XX:+UseCMSInitiatingOccupancyOnly     
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96307.png)

可以结合**对象挪动到老年代那些规则**推理下这个程序可能存在的一些问题

经过分析感觉可能会由于**对象动态年龄判断机制**导致`full gc`较为频繁

为了看出效果，模拟了一个示例程序(见工程代码：`jvm-full-gc`)，打印了`jstat`的结果如下：

```sh
jstat -gc 13456 2000 10000
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96359.png)

对于对象动态年龄判断机制导致的`full gc`较为频繁可以先试着优化下JVM参数

1. 把年轻代适当调大点：

```sh
-Xms1536M -Xmx1536M -Xmn1024M -Xss256K -XX:SurvivorRatio=6  -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M  -XX:+UseParNewGC  -XX:+UseConcMarkSweepGC  -XX:CMSInitiatingOccupancyFraction=92 -XX:+UseCMSInitiatingOccupancyOnly
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96350.png)

结果：优化完发现没什么变化，**`full gc`的次数比`minor gc`的次数还多了**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96366.png)

可以推测下`full gc`比`minor gc`还多的原因有哪些？

1. 元空间不够导致的多余`full gc`

2. 显示调用`System.gc()`造成多余的`full gc`，这种一般线上尽量通过`-XX:+DisableExplicitGC`参数禁用，如果加上了这个JVM启动参数，那么代码中调用`System.gc()`没有任何效果

3. **老年代空间分配担保机制**

最快速度分析完这些我们推测的原因以及优化后，我们发现`young gc`和`full gc`依然很频繁了，而且看到有大量的对象频繁的被挪动到老年代，这种情况我们可以借助`jmap`命令大概看下是什么对象

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96303.png)

查到了有大量`User`对象产生，这个可能是问题所在，但不确定，还必须找到对应的代码确认，如何去找对应的代码了？

1. 代码里全文搜索生成User对象的地方(适合只有少数几处地方的情况)

2. 如果生成User对象的地方太多，无法定位具体代码，我们可以同时分析下占用cpu较高的线程，一般有大量对象不断产生，对应的方法代码肯定会被频繁调用，占用的cpu必然较高

可以用上面讲过的`jstack`或`jvisualvm`来定位cpu使用较高的代码，最终定位到的代码如下：

```java
import java.util.ArrayList;

@RestController
public class IndexController {

    @RequestMapping("/user/process")
    public String processUserData() throws InterruptedException {
        ArrayList<User> users = queryUsers();

        for (User user: users) {
            //TODO 业务处理
            System.out.println("user:" + user.toString());
        }
        return "end";
    }

    /**
     * 模拟批量查询用户场景
     * @return
     */
    private ArrayList<User> queryUsers() {
        ArrayList<User> users = new ArrayList<>();
        for (int i = 0; i < 5000; i++) {
            users.add(new User(i,"zhuge"));
        }
        return users;
    }
}
```

同时，java的代码也是需要优化的，一次查询出500M的对象出来，明显不合适，要根据之前说的各种原则尽量优化到合适的值，尽量消除这种朝生夕死的对象导致的`full gc`

**内存泄露到底是怎么回事**

一般电商架构可能会使用多级缓存架构，就是`redis`加上JVM级缓存，大多数开发人员可能为了图方便对于JVM级缓存就简单使用一个`hashmap`，于是不断往里面放缓存数据，但是很少考虑这个map的容量问题，结果这个缓存map越来越大，一直占用着老年代的很多空间，时间长了就会导致`full gc`非常频繁，这就是一种内存泄漏，对于一些老旧数据没有及时清理导致一直占用着宝贵的内存资源，时间长了除了导致`full gc`，还有可能导致`OOM`。

这种情况完全可以考虑采用一些成熟的JVM级缓存框架来解决，比如`ehcache`等自带一些`LRU`数据淘汰算法的框架来作为JVM级的缓存。

### Arthas

**Arthas** 是 Alibaba 在 2018 年 9 月开源的 **Java 诊断**工具。支持 JDK6+， 采用命令行交互模式，可以方便的定位和诊断线上程序运行问题。[**Arthas** 官方文档](https://alibaba.github.io/arthas)十分详细

 #### Arthas使用场景

得益于 **Arthas** 强大且丰富的功能，让 **Arthas** 能做的事情超乎想象。下面仅仅列举几项常见的使用情况，更多的使用场景可以在熟悉了 **Arthas** 之后自行探索。

1. 是否有一个全局视角来查看系统的运行状况？
2. 为什么 CPU 又升高了，到底是哪里占用了 CPU ？
3. 运行的多线程有死锁吗？有阻塞吗？
4. 程序运行耗时很长，是哪里耗时比较长呢？如何监测呢？
5. 这个类从哪个 jar 包加载的？为什么会报各种类相关的 Exception？
6. 我改的代码为什么没有执行到？难道是我没 commit？分支搞错了？
7. 遇到问题无法在线上 debug，难道只能通过加日志再重新发布吗？
8. 有什么办法可以监控到 JVM 的实时运行状态？

#### Arthas使用

```sh
# github下载arthas
wget https://alibaba.github.io/arthas/arthas-boot.jar
# 或者 Gitee 下载
wget https://arthas.gitee.io/arthas-boot.jar
```

用`java -jar`运行即可，可以识别机器上所有Java进程(我们这里之前已经运行了一个Arthas测试程序，代码见下方)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96552.png)

```java
package com.tuling.jvm;

import java.util.HashSet;

public class Arthas {

    private static HashSet hashSet = new HashSet();

    public static void main(String[] args) {
        // 模拟 CPU 过高
        cpuHigh();
        // 模拟线程死锁
        deadThread();
        // 不断的向 hashSet 集合增加数据
        addHashSetThread();
    }

    /**
     * 不断的向 hashSet 集合添加数据
     */
    public static void addHashSetThread() {
        // 初始化常量
        new Thread(() -> {
            int count = 0;
            while (true) {
                try {
                    hashSet.add("count" + count);
                    Thread.sleep(1000);
                    count++;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }

    public static void cpuHigh() {
        new Thread(() -> {
            while (true) {

            }
        }).start();
    }

    /**
     * 死锁
     */
    private static void deadThread() {
        /** 创建资源 */
        Object resourceA = new Object();
        Object resourceB = new Object();
        // 创建线程
        Thread threadA = new Thread(() -> {
            synchronized (resourceA) {
                System.out.println(Thread.currentThread() + " get ResourceA");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread() + "waiting get resourceB");
                synchronized (resourceB) {
                    System.out.println(Thread.currentThread() + " get resourceB");
                }
            }
        });

        Thread threadB = new Thread(() -> {
            synchronized (resourceB) {
                System.out.println(Thread.currentThread() + " get ResourceB");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                System.out.println(Thread.currentThread() + "waiting get resourceA");
                synchronized (resourceA) {
                    System.out.println(Thread.currentThread() + " get resourceA");
                }
            }
        });
        threadA.start();
        threadB.start();
    }
}
```

选择进程序号1，进入进程信息操作

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96569.png)

输入**`dashboard`**可以查看整个进程的运行情况，线程、内存、GC、运行环境信息：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96574.png)

输入**`thread`**可以查看线程详细情况

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96580.png)

输入 **`thread`加上线程ID** 可以查看线程堆栈

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96586.png)

输入 **`thread -b`** 可以查看线程死锁

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96592.png)

**输入` jad`加类的全名 可以反编译，这样可以方便我们查看线上代码是否是正确的版本**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96602.png)

**使用 `ognl` 命令可以对线上代码进行修改**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96607.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/96615.png)

更多命令使用可以用help命令查看，或[查看文档](https://alibaba.github.io/arthas/commands.html#arthas)

### GC日志详解

对于java应用我们可以通过一些配置把程序运行过程中的gc日志全部打印出来，然后分析gc日志得到关键性指标，分析GC原因，调优JVM参数。

打印GC日志方法，在JVM参数里增加参数，%t 代表时间

```sh
-Xloggc:./gc-%t.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps  -XX:+PrintGCTimeStamps -XX:+PrintGCCause  
-XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M
```

`Tomcat`则直接加在`JAVA_OPTS`变量里。

**如何分析GC日志**

运行程序加上对应gc日志

```sh
java -jar -Xloggc:./gc-%t.log -XX:+PrintGCDetails -XX:+PrintGCDateStamps  -XX:+PrintGCTimeStamps -XX:+PrintGCCause   -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M microservice-eureka-server.jar
```

下图中是截取的JVM刚启动的一部分GC日志 

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/clipboard.png)

> 1. 第一行红框，是项目的配置参数。这里不仅配置了打印GC日志，还有相关的VM内存参数。 
>
> 2. 第二行红框中的是在这个GC时间点发生GC之后相关GC情况。 

1. 对于`2.909`：这是从jvm启动开始计算到这次GC经过的时间，前面还有具体的发生时间日期。 

2. `Full GC(Metadata GC Threshold)`指这是一次`full gc`，括号里是gc的原因， `PSYoungGen`是年轻代的GC，`ParOldGen`是老年代的GC，`Metaspace`是元空间的GC

3. `6160K->0K(141824K)`，这三个数字分别对应GC之前占用年轻代的大小，GC之后年轻代占用，以及整个年轻代的大小。 

4. `112K->6056K(95744K)`，这三个数字分别对应GC之前占用老年代的大小，GC之后老年代占用，以及整个老年代的大小。 

5. `6272K->6056K(237568K)`，这三个数字分别对应GC之前占用堆内存的大小，GC之后堆内存占用，以及整个堆内存的大小。 

6. `20516K->20516K(1069056K)`，这三个数字分别对应GC之前占用元空间内存的大小，GC之后元空间内存占用，以及整个元空间内存的大小。 

7. `0.0209707`是该时间点GC总耗费时间。 

从日志可以发现几次`full gc`都是由于元空间不够导致的，所以可以将元空间调大点

```sh
java -jar -Xloggc:./gc-adjust-%t.log -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:+PrintGCDetails -XX:+PrintGCDateStamps   -XX:+PrintGCTimeStamps -XX:+PrintGCCause  -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M  microservice-eureka-server.jar
```

调整完再看下gc日志发现已经没有因为元空间不够导致的`full gc`了

对于CMS和G1收集器的日志会有一点不一样，也可以试着打印下对应的gc日志分析下，可以发现gc日志里面的gc步骤跟之前讲过的步骤是类似的

```java
public class HeapTest {

    byte[] a = new byte[1024 * 100];  //100KB

    public static void main(String[] args) throws InterruptedException {
        ArrayList<HeapTest> heapTests = new ArrayList<>();
        while (true) {
            heapTests.add(new HeapTest());
            Thread.sleep(10);
        }
    }
}
```

**CMS**

```sh
-Xloggc:d:/gc-cms-%t.log -Xms50M -Xmx50M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:+PrintGCDetails -XX:+PrintGCDateStamps   -XX:+PrintGCTimeStamps -XX:+PrintGCCause  -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M  -XX:+UseParNewGC -XX:+UseConcMarkSweepGC
```

**G1**

```sh
-Xloggc:d:/gc-g1-%t.log -Xms50M -Xmx50M -XX:MetaspaceSize=256M -XX:MaxMetaspaceSize=256M -XX:+PrintGCDetails -XX:+PrintGCDateStamps   -XX:+PrintGCTimeStamps -XX:+PrintGCCause  -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=10 -XX:GCLogFileSize=100M -XX:+UseG1GC
```

上面的这些参数，能够帮查看分析GC的垃圾收集情况。但是如果GC日志很多很多，成千上万行。就算你一目十行，看完了，脑子也是一片空白。所以可以借助一些功能来帮助我们分析，这里推荐一个[gceasy](https://gceasy.io)，可以上传gc文件，然后他会利用可视化的界面来展现GC情况。具体下图所示 

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80219.png)

上图我们可以看到年轻代，老年代，以及永久代的内存分配，和最大使用情况。 

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80221.png)

上图我们可以看到堆内存在GC之前和之后的变化，以及其他信息。

这个工具还提供基于机器学习的JVM智能优化建议，当然现在这个功能需要付费

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80273.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80276.png)

**JVM参数汇总查看命令**

```sh
java -XX:+PrintFlagsInitial # 表示打印出所有参数选项的默认值
java -XX:+PrintFlagsFinal # 表示打印出所有参数选项在运行程序时生效的值
```

### Class常量池与运行时常量池

Class常量池可以理解为是Class文件中的资源仓库。 Class文件中除了包含类的版本、字段、方法、接口等描述信息外，还有一项信息就是**常量池(`constant pool table`)**，用于存放编译期生成的各种**字面量(`Literal`)和符号引用(`Symbolic References`)**。

一个class文件的16进制大体结构如下图：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80047.png)

对应的含义如下，细节可以查下`oracle`官方文档

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/80124.png)

当然一般不会去人工解析这种16进制的字节码文件，我们一般可以通过`javap`命令生成更可读的JVM字节码指令文件：

`javap -v Math.class`

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/1.png)

红框标出的就是class常量池信息，常量池中主要存放两大类常量：**字面量和符号引用**。

#### 字面量

**字面量就是指由字母、数字等构成的字符串或者数值常量**

字面量只可以右值出现，所谓右值是指等号右边的值，如：`int a=1` 这里的a为左值，1为右值。在这个例子中1就是字面量。

```java
int a = 1;
int b = 2;
int c = "abcdefg";
int d = "abcdefg";
```

#### 符号引用

符号引用是编译原理中的概念，是相对于直接引用来说的。主要包括了以下三类常量：

- 类和接口的全限定名 
- 字段的名称和描述符 
- 方法的名称和描述符

上面的`a，b`就是字段名称，就是一种符号引用，还有Math类常量池里的 `com/tuling/jvm/Math` 是类的全限定名，main和`compute`是方法名称，`()`是一种UTF8格式的描述符，这些都是符号引用。

这些常量池现在是静态信息，只有到运行时被加载到内存后，这些符号才有对应的内存地址信息，这些常量池一旦被装入内存就变成**运行时常量池**，对应的符号引用在程序加载或运行时会被转变为被加载到内存区域的代码的直接引用，也就是我们说的**动态链接了。例如，`compute()`这个符号引用在运行时就会被转变为`compute()`方法具体代码在内存中的地址，主要通过对象头里的类型指针去转换直接引用。**

#### 字符串常量池

**字符串常量池的设计思想**

1. 字符串的分配，和其他的对象分配一样，耗费高昂的时间与空间代价，作为最基础的数据类型，大量频繁的创建字符串，极大程度地影响程序的性能
2. JVM为了提高性能和减少内存开销，在实例化字符串常量的时候进行了一些优化

- 为字符串开辟一个字符串常量池，类似于缓存区
- 创建字符串常量时，首先查询字符串常量池是否存在该字符串
- 存在该字符串，返回引用实例，不存在，实例化该字符串并放入池中

**三种字符串操作(`Jdk1.7` 及以上版本)**

- 直接赋值字符串

```java
String s = "zhuge";  // s指向常量池中的引用
```

这种方式创建的字符串对象，只会在常量池中。

因为有`"zhuge"`这个字面量，创建对象s的时候，JVM会先去常量池中通过 `equals(key)` 方法，判断是否有相同的对象

如果有，则直接返回该对象在常量池中的引用；如果没有，则会在常量池中创建一个新对象，再返回引用。

- `new String()`;

```java
String s1 = new String("zhuge");  // s1指向内存中的对象引用
```

这种方式会保证字符串常量池和堆中都有这个对象，没有就创建，最后返回堆内存中的对象引用。

步骤大致如下：

因为有`"zhuge"`这个字面量，所以会先检查字符串常量池中是否存在字符串`"zhuge"`

不存在，先在字符串常量池里创建一个字符串对象；再去内存中创建一个字符串对象`"zhuge"`；存在的话，就直接去堆内存中创建一个字符串对象`"zhuge"`；最后，将内存中的引用返回。

- `intern`方法

```java
String s1 = new String("zhuge");   
String s2 = s1.intern();

System.out.println(s1 == s2);  //false
```

`String`中的`intern`方法是一个 `native` 的方法，当调用 intern方法时，如果池已经包含一个等于此`String`对象的字符串（用`equals(oject)`方法确定），则返回池中的字符串。**否则，将intern返回的引用指向当前字符串 s1**(**jdk1.6版本需要将 s1 复制到字符串常量池里**)。

**字符串常量池位置**

- `Jdk1.6`及之前： 有永久代, 运行时常量池在永久代，运行时常量池包含字符串常量池

- `Jdk1.7`：有永久代，但已经逐步“去永久代”，字符串常量池从永久代里的运行时常量池分离到堆里

- `Jdk1.8`及之后： 无永久代，运行时常量池在元空间，字符串常量池里依然在堆里

用一个程序证明下字符串常量池在哪里：

```java
/**
 * jdk6：-Xms6M -Xmx6M -XX:PermSize=6M -XX:MaxPermSize=6M  
 * jdk8：-Xms6M -Xmx6M -XX:MetaspaceSize=6M -XX:MaxMetaspaceSize=6M
 */
public class RuntimeConstantPoolOOM{
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<String>();
        for (int i = 0; i < 10000000; i++) {
            String str = String.valueOf(i).intern();
            list.add(str);
        }
    }
}

运行结果：
jdk7及以上：Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
jdk6：Exception in thread "main" java.lang.OutOfMemoryError: PermGen space
```

**字符串常量池设计原理**

字符串常量池底层是`hotspot`的C++实现的，底层类似一个 `HashTable`， 保存的本质上是字符串对象的引用。

看一道比较常见的面试题，下面的代码创建了多少个 String 对象？

```java
String s1 = new String("he") + new String("llo");
String s2 = s1.intern();
 
System.out.println(s1 == s2);
// 在 JDK 1.6 下输出是 false，创建了 6 个对象
// 在 JDK 1.7 及以上的版本输出是 true，创建了 5 个对象
// 当然我们这里没有考虑GC，但这些对象确实存在或存在过
```

> 为什么输出会有这些变化呢？主要还是字符串池从永久代中脱离、移入堆区的原因， `intern()` 方法也相应发生了变化：

1. 在 JDK 1.6 中，调用 `intern()` 首先会在字符串池中寻找 `equal()` 相等的字符串，假如字符串存在就返回该字符串在字符串池中的引用；假如字符串不存在，虚拟机会重新在永久代上创建一个实例，将 `StringTable` 的一个表项指向这个新创建的实例。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2.png)

2. 在 JDK 1.7 (及以上版本)中，由于字符串池不在永久代了，`intern()` 做了一些修改，更方便地利用堆中的对象。字符串存在时和 JDK 1.6一样，但是字符串不存在时不再需要重新创建实例，可以直接指向堆上的实例。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/3.png)

> 由上面两个图，也不难理解为什么 JDK 1.6 字符串池溢出会抛出 `OutOfMemoryError: PermGen space` ，而在 JDK 1.7 及以上版本抛出 `OutOfMemoryError: Java heap space` 。

**String常量池问题的几个例子**

示例1：

```java
String s0="zhuge";
String s1="zhuge";
String s2="zhu" + "ge";
System.out.println( s0==s1 ); //true
System.out.println( s0==s2 ); //true
```

> 分析：因为例子中的 s0和s1中的`”zhuge”`都是字符串常量，它们在编译期就被确定了，所以`s0==s1`为true；而`”zhu”`和`”ge”`也都是字符串常量，当一个字符串由多个字符串常量连接而成时，它自己肯定也是字符串常量，所以s2也同样在编译期就被优化为一个字符串常量`"zhuge"`，所以s2也是常量池中`” zhuge”`的一个引用。所以我们得出`s0==s1==s2`；

示例2：

```java
String s0="zhuge";
String s1=new String("zhuge");
String s2="zhu" + new String("ge");
System.out.println( s0==s1 );　　// false
System.out.println( s0==s2 )；　 // false
System.out.println( s1==s2 );　　// false
```

> 分析：用`new String()` 创建的字符串不是常量，不能在编译期就确定，所以`new String()` 创建的字符串不放入常量池中，它们有自己的地址空间。
>
> s0还是常量池中`"zhuge”`的引用，s1因为无法在编译期确定，所以是运行时创建的新对象`”zhuge”`的引用，s2因为有后半部分 `new String(”ge”)`所以也无法在编译期确定，所以也是一个新创建对象`”zhuge”`的引用;明白了这些也就知道为何得出此结果了。

示例3：

```java
String a = "a1";
String b = "a" + 1;
System.out.println(a == b); // true 

String a = "atrue";
String b = "a" + "true";
System.out.println(a == b); // true 

String a = "a3.4";
String b = "a" + 3.4;
System.out.println(a == b); // true
```

> 分析：JVM对于字符串常量的"+"号连接，将在程序编译期，JVM就将常量字符串的"+"连接优化为连接后的值，拿`"a" + 1`来说，经编译器优化后在class中就已经是a1。在编译期其字符串常量的值就确定下来，故上面程序最终的结果都为true。

示例4：

```java
String a = "ab";
String bb = "b";
String b = "a" + bb;

System.out.println(a == b); // false
```

> 分析：JVM对于字符串引用，由于在字符串的"+"连接中，有字符串引用存在，而引用的值在程序编译期是无法确定的，即`"a" + bb`无法被编译器优化，只有在程序运行期来动态分配并将连接后的新地址赋给b。所以上面程序的结果也就为false。

示例5：

```java
String a = "ab";
final String bb = "b";
String b = "a" + bb;

System.out.println(a == b); // true
```

> 分析：和示例4中唯一不同的是bb字符串加了`final`修饰，对于`final`修饰的变量，它在编译时被解析为常量值的一个本地拷贝存储到自己的常量池中或嵌入到它的字节码流中。所以此时的`"a" + bb`和`"a" + "b"`效果是一样的。故上面程序的结果为true。

示例6：

```java
String a = "ab";
final String bb = getBB();
String b = "a" + bb;

System.out.println(a == b); // false

private static String getBB() {  return "b";  }
```

> 分析：JVM对于字符串引用bb，它的值在编译期无法确定，只有在程序运行期调用方法后，将方法的返回值和"a"来动态连接并分配地址为b，故上面程序的结果为false。

**关于String是不可变的**

通过上面例子可以得出得知：

```java
String  s  =  "a" + "b" + "c";  //就等价于String s = "abc";
String  a  =  "a";
String  b  =  "b";
String  c  =  "c";
String  s1  =   a  +  b  +  c;
```

s1 这个就不一样了，可以通过观察其**JVM指令码**发现s1的"+"操作会变成如下操作：

```java
StringBuilder temp = new StringBuilder();
temp.append(a).append(b).append(c);
String s = temp.toString();
```

**最后再看一个例子**：

```java
//字符串常量池："计算机"和"技术"     堆内存：str1引用的对象"计算机技术"  
//堆内存中还有个StringBuilder的对象，但是会被gc回收，StringBuilder的toString方法会new String()，这个String才是真正返回的对象引用
String str2 = new StringBuilder("计算机").append("技术").toString();   //没有出现"计算机技术"字面量，所以不会在常量池里生成"计算机技术"对象
System.out.println(str2 == str2.intern());  //true
//"计算机技术" 在池中没有，但是在heap中存在，则intern时，会直接返回该heap中的引用

//字符串常量池："ja"和"va"     堆内存：str1引用的对象"java"  
//堆内存中还有个StringBuilder的对象，但是会被gc回收，StringBuilder的toString方法会new String()，这个String才是真正返回的对象引用
String str1 = new StringBuilder("ja").append("va").toString();    //没有出现"java"字面量，所以不会在常量池里生成"java"对象
System.out.println(str1 == str1.intern());  //false
//java是关键字，在JVM初始化的相关类里肯定早就放进字符串常量池了

String s1 = new String("test");  
System.out.println(s1 == s1.intern());   //false
//"test"作为字面量，放入了池中，而new时s1指向的是heap中新生成的string对象，s1.intern()指向的是"test"字面量之前在池中生成的字符串对象

String s2 = new StringBuilder("abc").toString();
System.out.println(s2 == s2.intern());  //false
//同上
```

#### 八种基本类型的包装类和对象池

java中基本类型的包装类的大部分都实现了常量池技术(严格来说应该叫**对象池，**在堆上)，这些类是`Byte,Short,Integer,Long,Character,Boolean`，另外两种浮点数类型的包装类则没有实现。另外`Byte,Short,Integer,Long,Character`这5种整型的包装类也只是在对应值**小于等于127**时才可使用对象池，也即对象不负责创建和管理大于127的这些类的对象。因为一般这种比较小的数用到的概率相对较大。

```java
public class Test {

    public static void main(String[] args) {
        //5种整形的包装类Byte,Short,Integer,Long,Character的对象，  
        //在值小于127时可以使用对象池  
        Integer i1 = 127;  //这种调用底层实际是执行的Integer.valueOf(127)，里面用到了IntegerCache对象池
        Integer i2 = 127;
        System.out.println(i1 == i2);//输出true  

        //值大于127时，不会从对象池中取对象  
        Integer i3 = 128;
        Integer i4 = 128;
        System.out.println(i3 == i4);//输出false  
        
        //用new关键词新生成对象不会使用对象池
        Integer i5 = new Integer(127);  
        Integer i6 = new Integer(127);
        System.out.println(i5 == i6);//输出false 

        //Boolean类也实现了对象池技术  
        Boolean bool1 = true;
        Boolean bool2 = true;
        System.out.println(bool1 == bool2);//输出true  

        //浮点类型的包装类没有实现对象池技术  
        Double d1 = 1.0;
        Double d2 = 1.0;
        System.out.println(d1 == d2);//输出false  
    }
} 
```

## JIT

**JVM的语言无关性**

跨语言（语言无关性）：JVM只识别字节码，所以JVM其实跟语言是解耦的，也就是没有直接关联，JVM运行不是翻译Java文件，而是识别class文件，这个一般称之为字节码。还有像`Groovy 、Kotlin、Scala`等等语言，它们其实也是编译成字节码，所以它们也可以在JVM上面跑，这个就是JVM的跨语言特征。Java的跨语言性一定程度上奠定了非常强大的java语言生态圈。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2444.png)

**解释执行与JIT**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2436.png)

Java程序在运行的时候，主要就是执行字节码指令，一般这些指令会按照顺序解释执行，这种就是**解释执行**。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2461.png)

但是那些被频繁调用的代码，比如调用次数很高或者在 for 循环里的那些代码,如果按照解释执行，效率是非常低的。（这个就是Java以前被C、C++开发者吐槽慢的原因）

**以上的这些代码称为热点代码。**所以，为了提高热点代码的执行效率，在运行时，虚拟机将会把这些代码编译成与本地平台相关的机器码，并进行各种层次的优化。完成这个任务的编译器，就称为即时编译器（Just In Time Compiler），简称 **JIT 编译器**。

**C1、C2与Graal编译器**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2440.png)

在JDK1.8中 HotSpot 虚拟机中，内置了两个 JIT，分别为 C1 编译器和 C2 编译器。

- **C1编译器**：C1 编译器是一个简单快速的编译器，主要的关注点在于局部性的优化，适用于执行时间较短或对启动性能有要求的程序，例如，GUI 应用对界面启动速度就有一定要求，C1也被称为 `Client Compiler`。C1编译器几乎不会对代码进行优化

- **C2编译器**：C2 编译器是为长期运行的服务器端应用程序做性能调优的编译器，适用于执行时间较长或对峰值性能有要求的程序。根据各自的适配性，这种即时编译也被称为`Server Compiler`。但是C2代码已超级复杂，无人能维护！所以才会开发Java编写的Graal编译器取代C2(JDK10开始)

### 分层编译

在 Java7之前，需要根据程序的特性来选择对应的 JIT，虚拟机默认采用解释器和其中一个编译器配合工作。

Java7及以后引入了分层编译，这种方式综合了 C1 的启动性能优势和 C2 的峰值性能优势，当然我们也可以通过参数强制指定虚拟机的即时编译模式。

**在 Java8 中，默认开启分层编译。**

1. **通过 `java -version` 命令行可以直接查看到当前系统使用的编译模式(默认分层编译)**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2442.png)

2. **使用“`-Xint`”参数强制虚拟机运行于只有解释器的编译模式**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2441.png)

3. **使用“`-Xcomp`”强制虚拟机运行于只有 JIT 的编译模式下**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2438.png)

### 热点代码

热点代码，就是那些被频繁调用的代码，比如调用次数很高或者在 `for` 循环里的那些代码。这些再次编译后的机器码会被缓存起来，以备下次使用，但对于那些执行次数很少的代码来说，这种编译动作就纯属浪费。

JVM提供了一个参数“`-XX:ReservedCodeCacheSize`”，用来限制 `CodeCache` 的大小。也就是说，JIT 编译后的代码都会放在 `CodeCache` 里。

如果这个空间不足，JIT 就无法继续编译，编译执行会变成解释执行，性能会降低一个数量级。同时，JIT 编译器会一直尝试去优化代码，从而造成了 CPU 占用上升。

**通过 `java -XX:+PrintFlagsFinal –version`查询:**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2450.png)

**热点探测**

在 HotSpot 虚拟机中的热点探测是 JIT 优化的条件，热点探测是基于计数器的热点探测，采用这种方法的虚拟机会为每个方法建立计数器统计方法的执行次数，如果执行次数超过一定的阈值就认为它是“热点方法”

虚拟机为**每个方法**准备了**两类计数器**：方法调用计数器（`Invocation Counter`）和回边计数器（`Back Edge Counter`）。在确定虚拟机运行参数的前提下，这两个计数器都有一个确定的阈值，当计数器超过阈值溢出了，就会触发 JIT 编译。

- **方法调用计数器**

用于统计方法被调用的次数，方法调用计数器的默认阈值在客户端模式下是 1500 次，在服务端模式下是 10000 次(我们用的都是服务端，java –version查询)，可通过 `-XX: CompileThreshold` 来设定

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2448.png)

**通过 `java -XX:+PrintFlagsFinal –version`查询**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2457.png)

- **回边计数器**

用于统计一个方法中循环体代码执行的次数，在字节码中遇到控制流向后跳转的指令称为“回边”（Back Edge），该值用于计算是否触发 C1 编译的阈值，在不开启分层编译的情况下，在服务端模式下是**10700**。

回边计数器阈值 =方法调用计数器阈值（CompileThreshold）×（OSR比率（OnStackReplacePercentage）-解释器监控比率（InterpreterProfilePercentage）/100

**通过 `java -XX:+PrintFlagsFinal –version`查询先关参数:**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2447.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2455.png)

其中`OnStackReplacePercentage`默认值为140，`InterpreterProfilePercentage`默认值为33，如果都取默认值，那Server模式虚拟机回边计数器的阈值为10700.

回边计数器阈值 =10000×（140-33）=10700

### 编译优化技术

JIT 编译运用了一些经典的编译优化技术来实现代码的优化，即通过一些例行检查优化，可以智能地编译出运行时的最优性能代码.

#### 方法内联

方法内联的优化行为就是把目标方法的代码复制到发起调用的方法之中，避免发生真实的方法调用。

**例如以下方法：**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2453.png)

**最终会被优化为：**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2459.png)

JVM 会自动识别热点方法，并对它们使用方法内联进行优化。我们可以通过 `-XX:CompileThreshold` 来设置热点方法的阈值。

但要强调一点，热点方法不一定会被 JVM 做内联优化，如果这个方法体太大了，JVM 将不执行内联操作。

而方法体的大小阈值，我们也可以通过参数设置来优化：经常执行的方法，默认情况下，方法体大小小于 325 字节的都会进行内联，我们可以通过 `-XX:FreqInlineSize=N` 来设置大小值；

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2443.png)

不是经常执行的方法，默认情况下，方法大小小于 35 字节才会进行内联，我们也可以通过 `-XX:MaxInlineSize=N` 来重置大小值。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2451.png)

**代码演示**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2445.png)

设置 VM 参数：`-XX:+PrintCompilation -XX:+UnlockDiagnosticVMOptions -XX:+PrintInlining` 

```sh
-XX:+PrintInlining 
-XX:+PrintCompilation   # 在控制台打印编译过程信息
-XX:+UnlockDiagnosticVMOptions # 解锁对JVM进行诊断的选项参数。默认是关闭的，开启后支持一些特定参数对JVM进行诊断
-XX:+PrintInlining # 将内联方法打印出来
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2439.png)

如果循环太少，则不会触发方法内联

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2456.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2454.png)

**热点方法的优化可以有效提高系统性能，一般我们可以通过以下几种方式来提高方法内联：**

- 通过设置 JVM 参数来减小热点阈值或增加方法体阈值，以便更多的方法可以进行内联，但这种方法意味着需要占用更多地内存；
- 在编程中，避免在一个方法中写大量代码，习惯使用小方法体；
- 尽量使用 `final、private、static` 关键字修饰方法，编码方法因为继承，会需要额外的类型检查。

#### 锁消除

在非线程安全的情况下，尽量不要使用线程安全容器，比如 `StringBuffer`。由于 `StringBuffer` 中的 `append` 方法被 `Synchronized` 关键字修饰，会使用到锁，从而导致性能下降。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2449.png)

但实际上，在以下代码测试中，`StringBuffer` 和 `StringBuilder` 的性能基本没什么区别。这是因为在局部方法中创建的对象只能被当前线程访问，无法被其它线程访问，这个变量的读写肯定不会有竞争，这个时候 JIT 编译会对这个对象的方法锁进行锁消除。

下代码测试中，`StringBuffer` 和 `StringBuilder` 的性能基本没什么区别。这是因为在局部方法中创建的对象只能被当前线程访问，无法被其它线程访问，这个变量的读写肯定不会有竞争，这个时候 JIT 编译会对这个对象的方法锁进行锁消除。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2458.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2466.png)

我们把锁消除关闭---测试发现性能差别有点大

`-XX:-EliminateLocks` 关闭锁消除

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2465.png)

#### 标量替换

逃逸分析证明一个对象不会被外部访问，如果这个对象可以被拆分的话，当程序真正执行的时候可能不创建这个对象，而直接创建它的成员变量来代替。将对象拆分后，可以分配对象的成员变量在栈或寄存器上，原本的对象就无需分配内存空间了。这种编译优化就叫做**标量替换**（前提是需要开启**逃逸分析**）。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2446.png)

`-XX:+DoEscapeAnalysis`开启逃逸分析（jdk1.8默认开启）、`-XX:+EliminateAllocations`开启标量替换（jdk1.8默认开启）

#### 逃逸分析

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2435.png)

**逃逸分析的原理：**分析对象动态作用域，当一个对象在方法中定义后，它可能被外部方法所引用。

比如：调用参数传递到其他方法中，这种称之为方法逃逸。甚至还有可能被外部线程访问到，例如：赋值给其他线程中访问的变量，这个称之为线程逃逸。

从不逃逸到方法逃逸到线程逃逸，称之为对象由低到高的不同逃逸程度。

如果确定一个对象不会逃逸出线程之外，那么让对象在栈上分配内存可以提高JVM的效率。

当然逃逸分析技术属于JIT的优化技术，所以必须要符合热点代码，JIT才会优化，另外对象如果要分配到栈上，需要将对象拆分，这种编译优化就叫做标量替换技术。

如下图中`foo`方法如果使用标量替换的话，那么最后执行的话就是`foo1`方法的效果。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2467.png)

**逃逸分析代码示例**

​    ![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2437.png)

这段代码在调用的过程中`Myboject`这个对象属于不可逃逸，JVM可以做栈上分配，所以运行速度非常快！JVM默认会做逃逸分析、会进行标量替换，会进行栈上分配。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2463.png)

然后关闭逃逸分析`-XX:-DoEscapeAnalysis`          

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2460.png)

然后关闭标量替换`-XX:-EliminateAllocations`

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2462.png)

测试结果可见，开启逃逸分析对代码的执行性能有很大的影响！那为什么有这个影响？

**逃逸分析**

如果是逃逸分析出来的对象可以在栈上分配的话，那么该对象的生命周期就跟随线程了，就不需要垃圾回收，如果是频繁的调用此方法则可以得到很大的性能提高。

采用了逃逸分析后，满足逃逸的对象在栈上分配，没有开启逃逸分析，对象都在堆上分配，会频繁触发垃圾回收（垃圾回收会影响系统性能），导致代码运行慢

**代码验证**

开启GC打印日志` -XX:+PrintGC`

**开启逃逸分析**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2464.png)

可以看到没有GC日志（因为进行了栈上分配）

**关闭逃逸分析**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/JVM/2452.png)

> 可以看到关闭了逃逸分析，JVM在频繁的进行垃圾回收（GC），正是这一块的操作导致性能有较大的差别。
















<template><h1 id="设计模式" tabindex="-1"><a class="header-anchor" href="#设计模式" aria-hidden="true">#</a> 设计模式</h1>
<h2 id="设计模式简介" tabindex="-1"><a class="header-anchor" href="#设计模式简介" aria-hidden="true">#</a> 设计模式简介</h2>
<p>设计模式（Design pattern）代表了最佳的实践，通常被有经验的面向对象的软件开发人员所采用。设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的。</p>
<h3 id="设计模式作用" tabindex="-1"><a class="header-anchor" href="#设计模式作用" aria-hidden="true">#</a> 设计模式作用</h3>
<p>设计模式是一套被反复使用的、多数人知晓的、经过分类编目的、代码设计经验的总结。使用设计模式是为了重用代码、让代码更容易被他人理解、保证代码可靠性。 毫无疑问，设计模式于己于他人于系统都是多赢的，设计模式使代码编制真正工程化，设计模式是软件工程的基石，如同大厦的一块块砖石一样。项目中合理地运用设计模式可以完美地解决很多问题，每种模式在现实中都有相应的原理来与之对应，每种模式都描述了一个在我们周围不断重复发生的问题，以及该问题的核心解决方案，这也是设计模式能被广泛应用的原因。</p>
<ul>
<li>对接口编程而不是对实现编程。</li>
<li>优先使用对象组合而不是继承。</li>
</ul>
<h3 id="设计模式类型" tabindex="-1"><a class="header-anchor" href="#设计模式类型" aria-hidden="true">#</a> 设计模式类型</h3>
<p>总共有 23 种设计模式。这些模式可以分为三大类：创建型模式（Creational Patterns）、结构型模式（Structural Patterns）、行为型模式（Behavioral Patterns）。当然，我们还会讨论另一类设计模式：J2EE 设计模式。</p>
<table class="reference notranslate">
<tbody><tr><th style="width:5%;">序号</th><th style="width:45%;">模式 &amp; 描述</th><th>包括</th></tr>
<tr><td>1</td><td><b>创建型模式</b><br>这些设计模式提供了一种在创建对象的同时隐藏创建逻辑的方式，而不是使用 new 运算符直接实例化对象。这使得程序在判断针对某个给定实例需要创建哪些对象时更加灵活。</td>
<td>
<ul>
<li>工厂模式（Factory Pattern）</li>
<li>抽象工厂模式（Abstract Factory Pattern）</li>
<li>单例模式（Singleton Pattern）</li>
<li>建造者模式（Builder Pattern）</li>
<li>原型模式（Prototype Pattern）</li>
</ul>
</td>
</tr>
<tr><td>2</td><td><b>结构型模式</b><br>这些设计模式关注类和对象的组合。继承的概念被用来组合接口和定义组合对象获得新功能的方式。</td>
<td>
<ul>
<li>适配器模式（Adapter Pattern）</li>
<li>桥接模式（Bridge Pattern）</li>
<li>过滤器模式（Filter、Criteria Pattern）</li>
<li>组合模式（Composite Pattern）</li>
<li>装饰器模式（Decorator Pattern）</li>
<li>外观模式（Facade Pattern）</li>
<li>享元模式（Flyweight Pattern）</li>
<li>代理模式（Proxy Pattern）</li>
</ul>
</td>
</tr>
<tr><td>3</td><td><b>行为型模式</b><br>这些设计模式特别关注对象之间的通信。</td>
<td>
<ul>
<li>责任链模式（Chain of Responsibility Pattern）</li>
<li>命令模式（Command Pattern）</li>
<li>解释器模式（Interpreter Pattern）</li>
<li>迭代器模式（Iterator Pattern）</li>
<li>中介者模式（Mediator Pattern）</li>
<li>备忘录模式（Memento Pattern）</li>
<li>观察者模式（Observer Pattern）</li>
<li>状态模式（State Pattern）</li>
<li>空对象模式（Null Object Pattern）</li>
<li>策略模式（Strategy Pattern）</li>
<li>模板模式（Template Pattern）</li>
<li>访问者模式（Visitor Pattern）</li>
</ul>
</td>
</tr>
<tr><td>4</td><td><b>J2EE 模式</b><br>这些设计模式特别关注表示层。这些模式是由 Sun Java Center 鉴定的。</td>
<td>
<ul>
<li>MVC 模式（MVC Pattern）</li>
<li>业务代表模式（Business Delegate Pattern）</li>
<li>组合实体模式（Composite Entity Pattern）</li>
<li>数据访问对象模式（Data Access Object Pattern）</li>
<li>前端控制器模式（Front Controller Pattern）</li>
<li>拦截过滤器模式（Intercepting Filter Pattern）</li>
<li>服务定位器模式（Service Locator Pattern）</li>
<li>传输对象模式（Transfer Object Pattern）</li>
</ul>
</td>
</tr>
</tbody></table>
<h3 id="设计模式的六大原则" tabindex="-1"><a class="header-anchor" href="#设计模式的六大原则" aria-hidden="true">#</a> 设计模式的六大原则</h3>
<ol>
<li>开闭原则（Open Close Principle）</li>
</ol>
<p>开闭原则的意思是：对扩展开放，对修改关闭。在程序需要进行拓展的时候，不能去修改原有的代码，实现一个热插拔的效果。简言之，是为了使程序的扩展性好，易于维护和升级。想要达到这样的效果，我们需要使用接口和抽象类，后面的具体设计中我们会提到这点。</p>
<ol>
<li>里氏代换原则（Liskov Substitution Principle）</li>
</ol>
<p>里氏代换原则是面向对象设计的基本原则之一。 里氏代换原则中说，任何基类可以出现的地方，子类一定可以出现。LSP 是继承复用的基石，只有当派生类可以替换掉基类，且软件单位的功能不受到影响时，基类才能真正被复用，而派生类也能够在基类的基础上增加新的行为。里氏代换原则是对开闭原则的补充。实现开闭原则的关键步骤就是抽象化，而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。</p>
<ol>
<li>依赖倒转原则（Dependence Inversion Principle）</li>
</ol>
<p>这个原则是开闭原则的基础，具体内容：针对接口编程，依赖于抽象而不依赖于具体。</p>
<ol start="4">
<li>接口隔离原则（Interface Segregation Principle）</li>
</ol>
<p>这个原则的意思是：使用多个隔离的接口，比使用单个接口要好。它还有另外一个意思是：降低类之间的耦合度。由此可见，其实设计模式就是从大型软件架构出发、便于升级和维护的软件设计思想，它强调降低依赖，降低耦合。</p>
<ol start="5">
<li>迪米特法则，又称最少知道原则（Demeter Principle）</li>
</ol>
<p>最少知道原则是指：一个实体应当尽量少地与其他实体之间发生相互作用，使得系统功能模块相对独立。</p>
<ol start="6">
<li>合成复用原则（Composite Reuse Principle）</li>
</ol>
<p>合成复用原则是指：尽量使用合成/聚合的方式，而不是使用继承。</p>
<h2 id="创建型模式" tabindex="-1"><a class="header-anchor" href="#创建型模式" aria-hidden="true">#</a> 创建型模式</h2>
<h3 id="工厂模式" tabindex="-1"><a class="header-anchor" href="#工厂模式" aria-hidden="true">#</a> 工厂模式</h3>
<p>工厂模式（Factory Pattern）是 Java 中最常用的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。</p>
<p>在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。</p>
<h4 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**定义一个创建对象的接口，让其子类自己决定实例化哪一个工厂类，工厂模式使其创建过程延迟到子类进行。</p>
<p>**主要解决：**主要解决接口选择的问题。</p>
<p>**何时使用：**我们明确地计划不同条件下创建不同实例时。</p>
<p>**如何解决：**让其子类实现工厂接口，返回的也是一个抽象的产品。</p>
<p>**关键代码：**创建过程在其子类执行。</p>
<p><strong>应用实例：</strong> 1、您需要一辆汽车，可以直接从工厂里面提货，而不用去管这辆汽车是怎么做出来的，以及这个汽车里面的具体实现。 2、Hibernate 换数据库只需换方言和驱动就可以。</p>
<p><strong>优点：</strong> 1、一个调用者想创建一个对象，只要知道其名称就可以了。 2、扩展性高，如果想增加一个产品，只要扩展一个工厂类就可以。 3、屏蔽产品的具体实现，调用者只关心产品的接口。</p>
<p>**缺点：**每次增加一个产品时，都需要增加一个具体类和对象实现工厂，使得系统中类的个数成倍增加，在一定程度上增加了系统的复杂度，同时也增加了系统具体类的依赖。这并不是什么好事。</p>
<p><strong>使用场景：</strong> 1、日志记录器：记录可能记录到本地硬盘、系统事件、远程服务器等，用户可以选择记录日志到什么地方。 2、数据库访问，当用户不知道最后系统采用哪一类数据库，以及数据库可能有变化时。 3、设计一个连接服务器的框架，需要三个协议，&quot;POP3&quot;、&quot;IMAP&quot;、&quot;HTTP&quot;，可以把这三个作为产品类，共同实现一个接口。</p>
<blockquote>
<p>注意事项：作为一种创建类模式，在任何需要生成复杂对象的地方，都可以使用工厂方法模式。有一点需要注意的地方就是复杂对象适合使用工厂模式，而简单对象，特别是只需要通过 new 就可以完成创建的对象，无需使用工厂模式。如果使用工厂模式，就需要引入一个工厂类，会增加系统的复杂度。</p>
</blockquote>
<h4 id="实现" tabindex="-1"><a class="header-anchor" href="#实现" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Shape 接口和实现 Shape 接口的实体类。下一步是定义工厂类 ShapeFactory。</p>
<p>FactoryPatternDemo 类使用 ShapeFactory 来获取 Shape 对象。它将向 ShapeFactory 传递信息（CIRCLE / RECTANGLE / SQUARE），以便获取它所需对象的类型。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Factory.jpg" alt="Factory"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口:</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>Rectangle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Rectangle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Square.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Square::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Circle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建一个工厂，生成基于给定信息的实体类的对象。</p>
<p>ShapeFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeFactory</span> <span class="token punctuation">{</span>
    
   <span class="token comment">//使用 getShape 方法获取形状类型的对象</span>
   <span class="token keyword">public</span> <span class="token class-name">Shape</span> <span class="token function">getShape</span><span class="token punctuation">(</span><span class="token class-name">String</span> shapeType<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>        
      <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"CIRCLE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"RECTANGLE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"SQUARE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用该工厂，通过传递类型信息来获取实体类的对象。</p>
<p>FactoryPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FactoryPatternDemo</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ShapeFactory</span> shapeFactory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShapeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取 Circle 的对象，并调用它的 draw 方法</span>
      <span class="token class-name">Shape</span> shape1 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"CIRCLE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Circle 的 draw 方法</span>
      shape1<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取 Rectangle 的对象，并调用它的 draw 方法</span>
      <span class="token class-name">Shape</span> shape2 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"RECTANGLE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Rectangle 的 draw 方法</span>
      shape2<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取 Square 的对象，并调用它的 draw 方法</span>
      <span class="token class-name">Shape</span> shape3 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"SQUARE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Square 的 draw 方法</span>
      shape3<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Inside Circle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Rectangle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Square::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="抽象工厂模式" tabindex="-1"><a class="header-anchor" href="#抽象工厂模式" aria-hidden="true">#</a> 抽象工厂模式</h3>
<p>抽象工厂模式（Abstract Factory Pattern）是围绕一个超级工厂创建其他工厂。该超级工厂又称为其他工厂的工厂。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。</p>
<p>在抽象工厂模式中，接口是负责创建一个相关对象的工厂，不需要显式指定它们的类。每个生成的工厂都能按照工厂模式提供对象。</p>
<h4 id="介绍-1" tabindex="-1"><a class="header-anchor" href="#介绍-1" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。</p>
<p>**主要解决：**主要解决接口选择的问题。</p>
<p>**何时使用：**系统的产品有多于一个的产品族，而系统只消费其中某一族的产品。</p>
<p>**如何解决：**在一个产品族里面，定义多个产品。</p>
<p>**关键代码：**在一个工厂里聚合多个同类产品。</p>
<p>**应用实例：**工作了，为了参加一些聚会，肯定有两套或多套衣服吧，比如说有商务装（成套，一系列具体产品）、时尚装（成套，一系列具体产品），甚至对于一个家庭来说，可能有商务女装、商务男装、时尚女装、时尚男装，这些也都是成套的，即一系列具体产品。假设一种情况（现实中是不存在的，但有利于说明抽象工厂模式），在您的家中，某一个衣柜（具体工厂）只能存放某一种这样的衣服（成套，一系列具体产品），每次拿这种成套的衣服时也自然要从这个衣柜中取出了。用 OOP 的思想去理解，所有的衣柜（具体工厂）都是衣柜类的（抽象工厂）某一个，而每一件成套的衣服又包括具体的上衣（某一具体产品），裤子（某一具体产品），这些具体的上衣其实也都是上衣（抽象产品），具体的裤子也都是裤子（另一个抽象产品）。</p>
<p>**优点：**当一个产品族中的多个对象被设计成一起工作时，它能保证客户端始终只使用同一个产品族中的对象。</p>
<p>**缺点：**产品族扩展非常困难，要增加一个系列的某一产品，既要在抽象的 Creator 里加代码，又要在具体的里面加代码。</p>
<p><strong>使用场景：</strong> 1、QQ 换皮肤，一整套一起换。 2、生成不同操作系统的程序。</p>
<blockquote>
<p>注意事项：产品族难扩展，产品等级易扩展。</p>
</blockquote>
<h4 id="实现-1" tabindex="-1"><a class="header-anchor" href="#实现-1" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建 Shape 和 Color 接口和实现这些接口的实体类。下一步是创建抽象工厂类 AbstractFactory。接着定义工厂类 ShapeFactory 和 ColorFactory，这两个工厂类都是扩展了 AbstractFactory。然后创建一个工厂创造器/生成器类 FactoryProducer。</p>
<p>AbstractFactoryPatternDemo 类使用 FactoryProducer 来获取 AbstractFactory 对象。它将向 AbstractFactory 传递形状信息 Shape（CIRCLE / RECTANGLE / SQUARE），以便获取它所需对象的类型。同时它还向 AbstractFactory 传递颜色信息 Color（RED / GREEN / BLUE），以便获取它所需对象的类型。</p>
<p><img src="@source/Back/imgs/Design-Pattern/AbstractFactory.jpg" alt="AbstractFactory"></p>
<p><strong>步骤 1</strong></p>
<p>为形状创建一个接口。</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>Rectangle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Rectangle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Square.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Square::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Circle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>为颜色创建一个接口。</p>
<p>Color.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>步骤4
创建实现接口的实体类。</p>
<p>Red.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Red</span> <span class="token keyword">implements</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Red::fill() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Green.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Green</span> <span class="token keyword">implements</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Green::fill() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Blue.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Blue</span> <span class="token keyword">implements</span> <span class="token class-name">Color</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Blue::fill() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 5</strong></p>
<p>为 Color 和 Shape 对象创建抽象类来获取工厂。</p>
<p>AbstractFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Color</span> <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">Shape</span> <span class="token function">getShape</span><span class="token punctuation">(</span><span class="token class-name">String</span> shape<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>步骤 6</strong></p>
<p>创建扩展了 AbstractFactory 的工厂类，基于给定的信息生成实体类的对象。</p>
<p>ShapeFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeFactory</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
    
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Shape</span> <span class="token function">getShape</span><span class="token punctuation">(</span><span class="token class-name">String</span> shapeType<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>        
      <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"CIRCLE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"RECTANGLE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>shapeType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"SQUARE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Color</span> <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>ColorFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ColorFactory</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractFactory</span> <span class="token punctuation">{</span>
    
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Shape</span> <span class="token function">getShape</span><span class="token punctuation">(</span><span class="token class-name">String</span> shapeType<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Color</span> <span class="token function">getColor</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>color <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>        
      <span class="token keyword">if</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"RED"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Red</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"GREEN"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Green</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>color<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"BLUE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Blue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>步骤 7</strong></p>
<p>创建一个工厂创造器/生成器类，通过传递形状或颜色信息来获取工厂。</p>
<p>FactoryProducer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FactoryProducer</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">AbstractFactory</span> <span class="token function">getFactory</span><span class="token punctuation">(</span><span class="token class-name">String</span> choice<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>choice<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"SHAPE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ShapeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>choice<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"COLOR"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ColorFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>步骤 8</strong></p>
<p>使用 FactoryProducer 来获取 AbstractFactory，通过传递类型信息来获取实体类的对象。</p>
<p>AbstractFactoryPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AbstractFactoryPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token comment">//获取形状工厂</span>
      <span class="token class-name">AbstractFactory</span> shapeFactory <span class="token operator">=</span> <span class="token class-name">FactoryProducer</span><span class="token punctuation">.</span><span class="token function">getFactory</span><span class="token punctuation">(</span><span class="token string">"SHAPE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取形状为 Circle 的对象</span>
      <span class="token class-name">Shape</span> shape1 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"CIRCLE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Circle 的 draw 方法</span>
      shape1<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取形状为 Rectangle 的对象</span>
      <span class="token class-name">Shape</span> shape2 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"RECTANGLE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Rectangle 的 draw 方法</span>
      shape2<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      <span class="token comment">//获取形状为 Square 的对象</span>
      <span class="token class-name">Shape</span> shape3 <span class="token operator">=</span> shapeFactory<span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"SQUARE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Square 的 draw 方法</span>
      shape3<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取颜色工厂</span>
      <span class="token class-name">AbstractFactory</span> colorFactory <span class="token operator">=</span> <span class="token class-name">FactoryProducer</span><span class="token punctuation">.</span><span class="token function">getFactory</span><span class="token punctuation">(</span><span class="token string">"COLOR"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取颜色为 Red 的对象</span>
      <span class="token class-name">Color</span> color1 <span class="token operator">=</span> colorFactory<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token string">"RED"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Red 的 fill 方法</span>
      color1<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取颜色为 Green 的对象</span>
      <span class="token class-name">Color</span> color2 <span class="token operator">=</span> colorFactory<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token string">"GREEN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Green 的 fill 方法</span>
      color2<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//获取颜色为 Blue 的对象</span>
      <span class="token class-name">Color</span> color3 <span class="token operator">=</span> colorFactory<span class="token punctuation">.</span><span class="token function">getColor</span><span class="token punctuation">(</span><span class="token string">"BLUE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//调用 Blue 的 fill 方法</span>
      color3<span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p><strong>步骤 9</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Inside Circle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Rectangle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Square::draw<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Red::fill<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Green::fill<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
Inside Blue::fill<span class="token punctuation">(</span><span class="token punctuation">)</span> method.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="单例模式" tabindex="-1"><a class="header-anchor" href="#单例模式" aria-hidden="true">#</a> 单例模式</h3>
<p>单例模式（Singleton Pattern）是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。</p>
<p>这种模式涉及到一个单一的类，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象。</p>
<p><strong>注意：</strong></p>
<p>1、单例类只能有一个实例。
2、单例类必须自己创建自己的唯一实例。
3、单例类必须给所有其他对象提供这一实例。</p>
<h4 id="介绍-2" tabindex="-1"><a class="header-anchor" href="#介绍-2" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**保证一个类仅有一个实例，并提供一个访问它的全局访问点。</p>
<p>**主要解决：**一个全局使用的类频繁地创建与销毁。</p>
<p>**何时使用：**当您想控制实例数目，节省系统资源的时候。</p>
<p>**如何解决：**判断系统是否已经有这个单例，如果有则返回，如果没有则创建。</p>
<p>**关键代码：**构造函数是私有的。</p>
<p><strong>应用实例：</strong></p>
<p>1、一个班级只有一个班主任。
2、Windows 是多进程多线程的，在操作一个文件的时候，就不可避免地出现多个进程或线程同时操作一个文件的现象，所以所有文件的处理必须通过唯一的实例来进行。
3、一些设备管理器常常设计为单例模式，比如一个电脑有两台打印机，在输出的时候就要处理不能两台打印机打印同一个文件。
<strong>优点：</strong></p>
<p>1、在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例（比如管理学院首页页面缓存）。
2、避免对资源的多重占用（比如写文件操作）。
**缺点：**没有接口，不能继承，与单一职责原则冲突，一个类应该只关心内部逻辑，而不关心外面怎么样来实例化。</p>
<p><strong>使用场景：</strong></p>
<p>1、要求生产唯一序列号。
2、WEB 中的计数器，不用每次刷新都在数据库里加一次，用单例先缓存起来。
3、创建的一个对象需要消耗的资源过多，比如 I/O 与数据库的连接等。</p>
<blockquote>
<p>注意事项：getInstance() 方法中需要使用同步锁 synchronized (Singleton.class) 防止多线程同时进入造成 instance 被多次实例化。</p>
</blockquote>
<h4 id="实现-2" tabindex="-1"><a class="header-anchor" href="#实现-2" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 SingleObject 类。SingleObject 类有它的私有构造函数和本身的一个静态实例。</p>
<p>SingleObject 类提供了一个静态方法，供外界获取它的静态实例。SingletonPatternDemo 类使用 SingleObject 类来获取 SingleObject 对象。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Single.jpg" alt="Single"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个 Singleton 类。</p>
<p>SingleObject.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingleObject</span> <span class="token punctuation">{</span>
 
   <span class="token comment">//创建 SingleObject 的一个对象</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">SingleObject</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingleObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
   <span class="token comment">//让构造函数为 private，这样该类就不会被实例化</span>
   <span class="token keyword">private</span> <span class="token class-name">SingleObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
 
   <span class="token comment">//获取唯一可用的对象</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">SingleObject</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 2</strong></p>
<p>从 singleton 类获取唯一的对象。</p>
<p>SingletonPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token comment">//不合法的构造函数</span>
      <span class="token comment">//编译时错误：构造函数 SingleObject() 是不可见的</span>
      <span class="token comment">//SingleObject object = new SingleObject();</span>
 
      <span class="token comment">//获取唯一可用的对象</span>
      <span class="token class-name">SingleObject</span> object <span class="token operator">=</span> <span class="token class-name">SingleObject</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//显示消息</span>
      object<span class="token punctuation">.</span><span class="token function">showMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 3</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Hello World<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="建造者模式" tabindex="-1"><a class="header-anchor" href="#建造者模式" aria-hidden="true">#</a> 建造者模式</h3>
<p>建造者模式（Builder Pattern）使用多个简单的对象一步一步构建成一个复杂的对象。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式。</p>
<p>一个 Builder 类会一步一步构造最终的对象。该 Builder 类是独立于其他对象的。</p>
<h4 id="介绍-3" tabindex="-1"><a class="header-anchor" href="#介绍-3" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**将一个复杂的构建与其表示相分离，使得同样的构建过程可以创建不同的表示。</p>
<p>**主要解决：**主要解决在软件系统中，有时候面临着&quot;一个复杂对象&quot;的创建工作，其通常由各个部分的子对象用一定的算法构成；由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法却相对稳定。</p>
<p>**何时使用：**一些基本部件不会变，而其组合经常变化的时候。</p>
<p>**如何解决：**将变与不变分离开。</p>
<p>**关键代码：**建造者：创建和提供实例，导演：管理建造出来的实例的依赖关系。</p>
<p><strong>应用实例：</strong> 1、去肯德基，汉堡、可乐、薯条、炸鸡翅等是不变的，而其组合是经常变化的，生成出所谓的&quot;套餐&quot;。 2、JAVA 中的 StringBuilder。</p>
<p><strong>优点：</strong> 1、建造者独立，易扩展。 2、便于控制细节风险。</p>
<p><strong>缺点：</strong> 1、产品必须有共同点，范围有限制。 2、如内部变化复杂，会有很多的建造类。</p>
<p><strong>使用场景：</strong> 1、需要生成的对象具有复杂的内部结构。 2、需要生成的对象内部属性本身相互依赖。</p>
<blockquote>
<p>注意事项：与工厂模式的区别是：建造者模式更加关注与零件装配的顺序。</p>
</blockquote>
<h4 id="实现-3" tabindex="-1"><a class="header-anchor" href="#实现-3" aria-hidden="true">#</a> 实现</h4>
<p>我们假设一个快餐店的商业案例，其中，一个典型的套餐可以是一个汉堡（Burger）和一杯冷饮（Cold drink）。汉堡（Burger）可以是素食汉堡（Veg Burger）或鸡肉汉堡（Chicken Burger），它们是包在纸盒中。冷饮（Cold drink）可以是可口可乐（coke）或百事可乐（pepsi），它们是装在瓶子中。</p>
<p>我们将创建一个表示食物条目（比如汉堡和冷饮）的 Item 接口和实现 Item 接口的实体类，以及一个表示食物包装的 Packing 接口和实现 Packing 接口的实体类，汉堡是包在纸盒中，冷饮是装在瓶子中。</p>
<p>然后我们创建一个 Meal 类，带有 Item 的 ArrayList 和一个通过结合 Item 来创建不同类型的 Meal 对象的 MealBuilder。BuilderPatternDemo 类使用 MealBuilder 来创建一个 Meal。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Builder.jpg" alt="Builder"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个表示食物条目和食物包装的接口。</p>
<p>Item.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token class-name">Packing</span> <span class="token function">packing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>Packing.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Packing</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现 Packing 接口的实体类。</p>
<p>Wrapper.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Wrapper</span> <span class="token keyword">implements</span> <span class="token class-name">Packing</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Wrapper"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Bottle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bottle</span> <span class="token keyword">implements</span> <span class="token class-name">Packing</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Bottle"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实现 Item 接口的抽象类，该类提供了默认的功能。</p>
<p>Burger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Burger</span> <span class="token keyword">implements</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Packing</span> <span class="token function">packing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Wrapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>ColdDrink.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ColdDrink</span> <span class="token keyword">implements</span> <span class="token class-name">Item</span> <span class="token punctuation">{</span>
 
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Packing</span> <span class="token function">packing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Bottle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
 
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建扩展了 Burger 和 ColdDrink 的实体类。</p>
<p>VegBurger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VegBurger</span> <span class="token keyword">extends</span> <span class="token class-name">Burger</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">25.0f</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Veg Burger"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>ChickenBurger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChickenBurger</span> <span class="token keyword">extends</span> <span class="token class-name">Burger</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">50.5f</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Chicken Burger"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Coke.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Coke</span> <span class="token keyword">extends</span> <span class="token class-name">ColdDrink</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">30.0f</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Coke"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>Pepsi.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Pepsi</span> <span class="token keyword">extends</span> <span class="token class-name">ColdDrink</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token number">35.0f</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Pepsi"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>步骤 5</strong></p>
<p>创建一个 Meal 类，带有上面定义的 Item 对象。</p>
<p>Meal.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Meal</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span> items <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Item</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addItem</span><span class="token punctuation">(</span><span class="token class-name">Item</span> item<span class="token punctuation">)</span><span class="token punctuation">{</span>
      items<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">getCost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">float</span> cost <span class="token operator">=</span> <span class="token number">0.0f</span><span class="token punctuation">;</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Item</span> item <span class="token operator">:</span> items<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         cost <span class="token operator">+=</span> item<span class="token punctuation">.</span><span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>        
      <span class="token keyword">return</span> cost<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">showItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Item</span> item <span class="token operator">:</span> items<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"Item : "</span><span class="token operator">+</span>item<span class="token punctuation">.</span><span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">", Packing : "</span><span class="token operator">+</span>item<span class="token punctuation">.</span><span class="token function">packing</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">pack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">", Price : "</span><span class="token operator">+</span>item<span class="token punctuation">.</span><span class="token function">price</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>        
   <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>步骤 6</strong></p>
<p>创建一个 MealBuilder 类，实际的 builder 类负责创建 Meal 对象。</p>
<p>MealBuilder.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MealBuilder</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Meal</span> prepareVegMeal <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">Meal</span> meal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      meal<span class="token punctuation">.</span><span class="token function">addItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">VegBurger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      meal<span class="token punctuation">.</span><span class="token function">addItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Coke</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> meal<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>   
 
   <span class="token keyword">public</span> <span class="token class-name">Meal</span> prepareNonVegMeal <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">Meal</span> meal <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Meal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      meal<span class="token punctuation">.</span><span class="token function">addItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ChickenBurger</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      meal<span class="token punctuation">.</span><span class="token function">addItem</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Pepsi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> meal<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>步骤 7</strong></p>
<p>BuiderPatternDemo 使用 MealBuilder 来演示建造者模式（Builder Pattern）。</p>
<p>BuilderPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BuilderPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">MealBuilder</span> mealBuilder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MealBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Meal</span> vegMeal <span class="token operator">=</span> mealBuilder<span class="token punctuation">.</span><span class="token function">prepareVegMeal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Veg Meal"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      vegMeal<span class="token punctuation">.</span><span class="token function">showItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Total Cost: "</span> <span class="token operator">+</span>vegMeal<span class="token punctuation">.</span><span class="token function">getCost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Meal</span> nonVegMeal <span class="token operator">=</span> mealBuilder<span class="token punctuation">.</span><span class="token function">prepareNonVegMeal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\n\nNon-Veg Meal"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      nonVegMeal<span class="token punctuation">.</span><span class="token function">showItems</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Total Cost: "</span> <span class="token operator">+</span>nonVegMeal<span class="token punctuation">.</span><span class="token function">getCost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>步骤 8</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Veg Meal
Item <span class="token builtin class-name">:</span> Veg Burger, Packing <span class="token builtin class-name">:</span> Wrapper, Price <span class="token builtin class-name">:</span> <span class="token number">25.0</span>
Item <span class="token builtin class-name">:</span> Coke, Packing <span class="token builtin class-name">:</span> Bottle, Price <span class="token builtin class-name">:</span> <span class="token number">30.0</span>
Total Cost: <span class="token number">55.0</span>


Non-Veg Meal
Item <span class="token builtin class-name">:</span> Chicken Burger, Packing <span class="token builtin class-name">:</span> Wrapper, Price <span class="token builtin class-name">:</span> <span class="token number">50.5</span>
Item <span class="token builtin class-name">:</span> Pepsi, Packing <span class="token builtin class-name">:</span> Bottle, Price <span class="token builtin class-name">:</span> <span class="token number">35.0</span>
Total Cost: <span class="token number">85.5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="原型模式" tabindex="-1"><a class="header-anchor" href="#原型模式" aria-hidden="true">#</a> 原型模式</h3>
<p>原型模式（Prototype Pattern）是用于创建重复的对象，同时又能保证性能。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式之一。</p>
<p>这种模式是实现了一个原型接口，该接口用于创建当前对象的克隆。当直接创建对象的代价比较大时，则采用这种模式。例如，一个对象需要在一个高代价的数据库操作之后被创建。我们可以缓存该对象，在下一个请求时返回它的克隆，在需要的时候更新数据库，以此来减少数据库调用。</p>
<h4 id="介绍-4" tabindex="-1"><a class="header-anchor" href="#介绍-4" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**用原型实例指定创建对象的种类，并且通过拷贝这些原型创建新的对象。</p>
<p>**主要解决：**在运行期建立和删除原型。</p>
<p><strong>何时使用：</strong> 1、当一个系统应该独立于它的产品创建，构成和表示时。 2、当要实例化的类是在运行时刻指定时，例如，通过动态装载。 3、为了避免创建一个与产品类层次平行的工厂类层次时。 4、当一个类的实例只能有几个不同状态组合中的一种时。建立相应数目的原型并克隆它们可能比每次用合适的状态手工实例化该类更方便一些。</p>
<p>**如何解决：**利用已有的一个原型对象，快速地生成和原型对象一样的实例。</p>
<p><strong>关键代码：</strong> 1、实现克隆操作，在 JAVA 实现 Cloneable 接口，重写 clone()，在 .NET 中可以使用 Object 类的 MemberwiseClone() 方法来实现对象的浅拷贝或通过序列化的方式来实现深拷贝。 2、原型模式同样用于隔离类对象的使用者和具体类型（易变类）之间的耦合关系，它同样要求这些&quot;易变类&quot;拥有稳定的接口。</p>
<p><strong>应用实例：</strong> 1、细胞分裂。 2、JAVA 中的 Object clone() 方法。</p>
<p><strong>优点：</strong> 1、性能提高。 2、逃避构造函数的约束。</p>
<p><strong>缺点：</strong> 1、配备克隆方法需要对类的功能进行通盘考虑，这对于全新的类不是很难，但对于已有的类不一定很容易，特别当一个类引用不支持串行化的间接对象，或者引用含有循环结构的时候。 2、必须实现 Cloneable 接口。</p>
<p><strong>使用场景：</strong> 1、资源优化场景。 2、类初始化需要消化非常多的资源，这个资源包括数据、硬件资源等。 3、性能和安全要求的场景。 4、通过 new 产生一个对象需要非常繁琐的数据准备或访问权限，则可以使用原型模式。 5、一个对象多个修改者的场景。 6、一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。 7、在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过 clone 的方法创建一个对象，然后由工厂方法提供给调用者。原型模式已经与 Java 融为浑然一体，大家可以随手拿来使用。</p>
<blockquote>
<p>注意事项：与通过对一个类进行实例化来构造新对象不同的是，原型模式是通过拷贝一个现有对象生成新对象的。浅拷贝实现 Cloneable，重写，深拷贝是通过实现 Serializable 读取二进制流。</p>
</blockquote>
<h4 id="实现-4" tabindex="-1"><a class="header-anchor" href="#实现-4" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个抽象类 Shape 和扩展了 Shape 类的实体类。下一步是定义类 ShapeCache，该类把 shape 对象存储在一个 Hashtable 中，并在请求的时候返回它们的克隆。</p>
<p>PrototypePatternDemo 类使用 ShapeCache 类来获取 Shape 对象。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Prototype.jpg" alt="Prototype"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个实现了 Cloneable 接口的抽象类。</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token class-name">String</span> id<span class="token punctuation">;</span>
   <span class="token keyword">protected</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>
   
   <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> type<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> id<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Object</span> clone <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
         clone <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">CloneNotSupportedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> clone<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建扩展了上面抽象类的实体类。</p>
<p>Rectangle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     type <span class="token operator">=</span> <span class="token string">"Rectangle"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Rectangle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Square.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     type <span class="token operator">=</span> <span class="token string">"Square"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Square::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     type <span class="token operator">=</span> <span class="token string">"Circle"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Inside Circle::draw() method."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建一个类，从数据库获取实体类，并把它们存储在一个 Hashtable 中。</p>
<p>ShapeCache.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Hashtable</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeCache</span> <span class="token punctuation">{</span>
    
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Hashtable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Shape</span><span class="token punctuation">></span></span> shapeMap 
      <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hashtable</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Shape</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Shape</span> <span class="token function">getShape</span><span class="token punctuation">(</span><span class="token class-name">String</span> shapeId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Shape</span> cachedShape <span class="token operator">=</span> shapeMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>shapeId<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span><span class="token punctuation">)</span> cachedShape<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token comment">// 对每种形状都运行数据库查询，并创建该形状</span>
   <span class="token comment">// shapeMap.put(shapeKey, shape);</span>
   <span class="token comment">// 例如，我们要添加三种形状</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">loadCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Circle</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      circle<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>circle<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>circle<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Square</span> square <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      square<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>square<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>square<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Rectangle</span> rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      rectangle<span class="token punctuation">.</span><span class="token function">setId</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>rectangle<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>rectangle<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>步骤 4</strong></p>
<p>PrototypePatternDemo 使用 ShapeCache 类来获取存储在 Hashtable 中的形状的克隆。</p>
<p>PrototypePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrototypePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ShapeCache</span><span class="token punctuation">.</span><span class="token function">loadCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Shape</span> clonedShape <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span><span class="token punctuation">)</span> <span class="token class-name">ShapeCache</span><span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Shape : "</span> <span class="token operator">+</span> clonedShape<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
 
      <span class="token class-name">Shape</span> clonedShape2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span><span class="token punctuation">)</span> <span class="token class-name">ShapeCache</span><span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Shape : "</span> <span class="token operator">+</span> clonedShape2<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
 
      <span class="token class-name">Shape</span> clonedShape3 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Shape</span><span class="token punctuation">)</span> <span class="token class-name">ShapeCache</span><span class="token punctuation">.</span><span class="token function">getShape</span><span class="token punctuation">(</span><span class="token string">"3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Shape : "</span> <span class="token operator">+</span> clonedShape3<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>        
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Shape <span class="token builtin class-name">:</span> Circle
Shape <span class="token builtin class-name">:</span> Square
Shape <span class="token builtin class-name">:</span> Rectangle
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="结构型模式" tabindex="-1"><a class="header-anchor" href="#结构型模式" aria-hidden="true">#</a> 结构型模式</h2>
<h3 id="适配器模式" tabindex="-1"><a class="header-anchor" href="#适配器模式" aria-hidden="true">#</a> 适配器模式</h3>
<p>适配器模式（Adapter Pattern）是作为两个不兼容的接口之间的桥梁。这种类型的设计模式属于结构型模式，它结合了两个独立接口的功能。</p>
<p>这种模式涉及到一个单一的类，该类负责加入独立的或不兼容的接口功能。举个真实的例子，读卡器是作为内存卡和笔记本之间的适配器。您将内存卡插入读卡器，再将读卡器插入笔记本，这样就可以通过笔记本来读取内存卡。</p>
<p>我们通过下面的实例来演示适配器模式的使用。其中，音频播放器设备只能播放 mp3 文件，通过使用一个更高级的音频播放器来播放 vlc 和 mp4 文件。</p>
<h4 id="介绍-5" tabindex="-1"><a class="header-anchor" href="#介绍-5" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**将一个类的接口转换成客户希望的另外一个接口。适配器模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。</p>
<p>**主要解决：**主要解决在软件系统中，常常要将一些&quot;现存的对象&quot;放到新的环境中，而新环境要求的接口是现对象不能满足的。</p>
<p><strong>何时使用：</strong> 1、系统需要使用现有的类，而此类的接口不符合系统的需要。 2、想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作，这些源类不一定有一致的接口。 3、通过接口转换，将一个类插入另一个类系中。（比如老虎和飞禽，现在多了一个飞虎，在不增加实体的需求下，增加一个适配器，在里面包容一个虎对象，实现飞的接口。）</p>
<p>**如何解决：**继承或依赖（推荐）。</p>
<p>**关键代码：**适配器继承或依赖已有的对象，实现想要的目标接口。</p>
<p><strong>应用实例：</strong> 1、美国电器 110V，中国 220V，就要有一个适配器将 110V 转化为 220V。 2、JAVA JDK 1.1 提供了 Enumeration 接口，而在 1.2 中提供了 Iterator 接口，想要使用 1.2 的 JDK，则要将以前系统的 Enumeration 接口转化为 Iterator 接口，这时就需要适配器模式。 3、在 LINUX 上运行 WINDOWS 程序。 4、JAVA 中的 jdbc。</p>
<p><strong>优点：</strong> 1、可以让任何两个没有关联的类一起运行。 2、提高了类的复用。 3、增加了类的透明度。 4、灵活性好。</p>
<p><strong>缺点：</strong> 1、过多地使用适配器，会让系统非常零乱，不易整体进行把握。比如，明明看到调用的是 A 接口，其实内部被适配成了 B 接口的实现，一个系统如果太多出现这种情况，无异于一场灾难。因此如果不是很有必要，可以不使用适配器，而是直接对系统进行重构。 2.由于 JAVA 至多继承一个类，所以至多只能适配一个适配者类，而且目标类必须是抽象类。</p>
<p>**使用场景：**有动机地修改一个正常运行的系统的接口，这时应该考虑使用适配器模式。</p>
<blockquote>
<p>注意事项：适配器不是在详细设计时添加的，而是解决正在服役的项目的问题。</p>
</blockquote>
<h4 id="实现-5" tabindex="-1"><a class="header-anchor" href="#实现-5" aria-hidden="true">#</a> 实现</h4>
<p>我们有一个 MediaPlayer 接口和一个实现了 MediaPlayer 接口的实体类 AudioPlayer。默认情况下，AudioPlayer 可以播放 mp3 格式的音频文件。</p>
<p>我们还有另一个接口 AdvancedMediaPlayer 和实现了 AdvancedMediaPlayer 接口的实体类。该类可以播放 vlc 和 mp4 格式的文件。</p>
<p>我们想要让 AudioPlayer 播放其他格式的音频文件。为了实现这个功能，我们需要创建一个实现了 MediaPlayer 接口的适配器类 MediaAdapter，并使用 AdvancedMediaPlayer 对象来播放所需的格式。</p>
<p>AudioPlayer 使用适配器类 MediaAdapter 传递所需的音频类型，不需要知道能播放所需格式音频的实际类。AdapterPatternDemo 类使用 AudioPlayer 类来播放各种格式。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Adapter.jpg" alt="Adapter"></p>
<p><strong>步骤 1</strong></p>
<p>为媒体播放器和更高级的媒体播放器创建接口。</p>
<p>MediaPlayer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token class-name">String</span> audioType<span class="token punctuation">,</span> <span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>AdvancedMediaPlayer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AdvancedMediaPlayer</span> <span class="token punctuation">{</span> 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playVlc</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playMp4</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现了 AdvancedMediaPlayer 接口的实体类。</p>
<p>VlcPlayer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VlcPlayer</span> <span class="token keyword">implements</span> <span class="token class-name">AdvancedMediaPlayer</span><span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playVlc</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Playing vlc file. Name: "</span><span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playMp4</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//什么也不做</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>Mp4Player.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mp4Player</span> <span class="token keyword">implements</span> <span class="token class-name">AdvancedMediaPlayer</span><span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playVlc</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">//什么也不做</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">playMp4</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Playing mp4 file. Name: "</span><span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实现了 MediaPlayer 接口的适配器类。</p>
<p>MediaAdapter.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MediaAdapter</span> <span class="token keyword">implements</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>
 
   <span class="token class-name">AdvancedMediaPlayer</span> advancedMusicPlayer<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">MediaAdapter</span><span class="token punctuation">(</span><span class="token class-name">String</span> audioType<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"vlc"</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">{</span>
         advancedMusicPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VlcPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>       
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"mp4"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         advancedMusicPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Mp4Player</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>  
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token class-name">String</span> audioType<span class="token punctuation">,</span> <span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"vlc"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         advancedMusicPlayer<span class="token punctuation">.</span><span class="token function">playVlc</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"mp4"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         advancedMusicPlayer<span class="token punctuation">.</span><span class="token function">playMp4</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建实现了 MediaPlayer 接口的实体类。</p>
<p>AudioPlayer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AudioPlayer</span> <span class="token keyword">implements</span> <span class="token class-name">MediaPlayer</span> <span class="token punctuation">{</span>
   <span class="token class-name">MediaAdapter</span> mediaAdapter<span class="token punctuation">;</span> 
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token class-name">String</span> audioType<span class="token punctuation">,</span> <span class="token class-name">String</span> fileName<span class="token punctuation">)</span> <span class="token punctuation">{</span>    
 
      <span class="token comment">//播放 mp3 音乐文件的内置支持</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"mp3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Playing mp3 file. Name: "</span><span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>         
      <span class="token punctuation">}</span> 
      <span class="token comment">//mediaAdapter 提供了播放其他文件格式的支持</span>
      <span class="token keyword">else</span> <span class="token keyword">if</span><span class="token punctuation">(</span>audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"vlc"</span><span class="token punctuation">)</span> 
         <span class="token operator">||</span> audioType<span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"mp4"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         mediaAdapter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MediaAdapter</span><span class="token punctuation">(</span>audioType<span class="token punctuation">)</span><span class="token punctuation">;</span>
         mediaAdapter<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span>audioType<span class="token punctuation">,</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">else</span><span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Invalid media. "</span><span class="token operator">+</span>
            audioType <span class="token operator">+</span> <span class="token string">" format not supported"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>步骤 5</strong></p>
<p>使用 AudioPlayer 来播放不同类型的音频格式。</p>
<p>AdapterPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AdapterPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">AudioPlayer</span> audioPlayer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AudioPlayer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      audioPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">"mp3"</span><span class="token punctuation">,</span> <span class="token string">"beyond the horizon.mp3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      audioPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">"mp4"</span><span class="token punctuation">,</span> <span class="token string">"alone.mp4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      audioPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">"vlc"</span><span class="token punctuation">,</span> <span class="token string">"far far away.vlc"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      audioPlayer<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token string">"avi"</span><span class="token punctuation">,</span> <span class="token string">"mind me.avi"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>步骤 6</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Playing mp3 file. Name: beyond the horizon.mp3
Playing mp4 file. Name: alone.mp4
Playing vlc file. Name: far far away.vlc
Invalid media. avi <span class="token function">format</span> not supported
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="桥接模式" tabindex="-1"><a class="header-anchor" href="#桥接模式" aria-hidden="true">#</a> 桥接模式</h3>
<p>桥接（Bridge）是用于把抽象化与实现化解耦，使得二者可以独立变化。这种类型的设计模式属于结构型模式，它通过提供抽象化和实现化之间的桥接结构，来实现二者的解耦。</p>
<p>这种模式涉及到一个作为桥接的接口，使得实体类的功能独立于接口实现类。这两种类型的类可被结构化改变而互不影响。</p>
<p>我们通过下面的实例来演示桥接模式（Bridge Pattern）的用法。其中，可以使用相同的抽象类方法但是不同的桥接实现类，来画出不同颜色的圆。</p>
<h4 id="介绍-6" tabindex="-1"><a class="header-anchor" href="#介绍-6" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**将抽象部分与实现部分分离，使它们都可以独立的变化。</p>
<p>**主要解决：**在有多种可能会变化的情况下，用继承会造成类爆炸问题，扩展起来不灵活。</p>
<p>**何时使用：**实现系统可能有多个角度分类，每一种角度都可能变化。</p>
<p>**如何解决：**把这种多角度分类分离出来，让它们独立变化，减少它们之间耦合。</p>
<p>**关键代码：**抽象类依赖实现类。</p>
<p><strong>应用实例：</strong> 1、猪八戒从天蓬元帅转世投胎到猪，转世投胎的机制将尘世划分为两个等级，即：灵魂和肉体，前者相当于抽象化，后者相当于实现化。生灵通过功能的委派，调用肉体对象的功能，使得生灵可以动态地选择。 2、墙上的开关，可以看到的开关是抽象的，不用管里面具体怎么实现的。</p>
<p><strong>优点：</strong> 1、抽象和实现的分离。 2、优秀的扩展能力。 3、实现细节对客户透明。</p>
<p>**缺点：**桥接模式的引入会增加系统的理解与设计难度，由于聚合关联关系建立在抽象层，要求开发者针对抽象进行设计与编程。</p>
<p><strong>使用场景：</strong> 1、如果一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性，避免在两个层次之间建立静态的继承联系，通过桥接模式可以使它们在抽象层建立一个关联关系。 2、对于那些不希望使用继承或因为多层次继承导致系统类的个数急剧增加的系统，桥接模式尤为适用。 3、一个类存在两个独立变化的维度，且这两个维度都需要进行扩展。</p>
<blockquote>
<p>注意事项：对于两个独立变化的维度，使用桥接模式再适合不过了。</p>
</blockquote>
<h4 id="实现-6" tabindex="-1"><a class="header-anchor" href="#实现-6" aria-hidden="true">#</a> 实现</h4>
<p>我们有一个作为桥接实现的 DrawAPI 接口和实现了 DrawAPI 接口的实体类 RedCircle、GreenCircle。Shape 是一个抽象类，将使用 DrawAPI 的对象。BridgePatternDemo 类使用 Shape 类来画出不同颜色的圆。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Bridge.jpg" alt="Bridge"></p>
<p><strong>步骤 1</strong></p>
<p>创建桥接实现接口。</p>
<p>DrawAPI.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DrawAPI</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token keyword">int</span> radius<span class="token punctuation">,</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现了 DrawAPI 接口的实体桥接实现类。</p>
<p>RedCircle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedCircle</span> <span class="token keyword">implements</span> <span class="token class-name">DrawAPI</span> <span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token keyword">int</span> radius<span class="token punctuation">,</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Drawing Circle[ color: red, radius: "</span>
         <span class="token operator">+</span> radius <span class="token operator">+</span><span class="token string">", x: "</span> <span class="token operator">+</span>x<span class="token operator">+</span><span class="token string">", "</span><span class="token operator">+</span> y <span class="token operator">+</span><span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>GreenCircle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GreenCircle</span> <span class="token keyword">implements</span> <span class="token class-name">DrawAPI</span> <span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token keyword">int</span> radius<span class="token punctuation">,</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Drawing Circle[ color: green, radius: "</span>
         <span class="token operator">+</span> radius <span class="token operator">+</span><span class="token string">", x: "</span> <span class="token operator">+</span>x<span class="token operator">+</span><span class="token string">", "</span><span class="token operator">+</span> y <span class="token operator">+</span><span class="token string">"]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>使用 DrawAPI 接口创建抽象类 Shape。</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">protected</span> <span class="token class-name">DrawAPI</span> drawAPI<span class="token punctuation">;</span>
   <span class="token keyword">protected</span> <span class="token class-name">Shape</span><span class="token punctuation">(</span><span class="token class-name">DrawAPI</span> drawAPI<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>drawAPI <span class="token operator">=</span> drawAPI<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建实现了 Shape 抽象类的实体类。</p>
<p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">extends</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> x<span class="token punctuation">,</span> y<span class="token punctuation">,</span> radius<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">,</span> <span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> radius<span class="token punctuation">,</span> <span class="token class-name">DrawAPI</span> drawAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">super</span><span class="token punctuation">(</span>drawAPI<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>  
      <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>  
      <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      drawAPI<span class="token punctuation">.</span><span class="token function">drawCircle</span><span class="token punctuation">(</span>radius<span class="token punctuation">,</span>x<span class="token punctuation">,</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 5</strong></p>
<p>使用 Shape 和 DrawAPI 类画出不同颜色的圆。</p>
<p>BridgePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BridgePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Shape</span> redCircle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">RedCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Shape</span> greenCircle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">,</span><span class="token number">100</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">GreenCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      redCircle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      greenCircle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>步骤 6</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Drawing Circle<span class="token punctuation">[</span> color: red, radius: <span class="token number">10</span>, x: <span class="token number">100</span>, <span class="token number">100</span><span class="token punctuation">]</span>
Drawing Circle<span class="token punctuation">[</span>  color: green, radius: <span class="token number">10</span>, x: <span class="token number">100</span>, <span class="token number">100</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="过滤器模式" tabindex="-1"><a class="header-anchor" href="#过滤器模式" aria-hidden="true">#</a> 过滤器模式</h3>
<p>过滤器模式（Filter Pattern）或标准模式（Criteria Pattern）是一种设计模式，这种模式允许开发人员使用不同的标准来过滤一组对象，通过逻辑运算以解耦的方式把它们连接起来。这种类型的设计模式属于结构型模式，它结合多个标准来获得单一标准。</p>
<h4 id="实现-7" tabindex="-1"><a class="header-anchor" href="#实现-7" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Person 对象、Criteria 接口和实现了该接口的实体类，来过滤 Person 对象的列表。CriteriaPatternDemo 类使用 Criteria 对象，基于各种标准和它们的结合来过滤 Person 对象的列表。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Filter.jpg" alt="Criteria"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个类，在该类上应用标准。</p>
<p>Person.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> gender<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> maritalStatus<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">String</span> gender<span class="token punctuation">,</span><span class="token class-name">String</span> maritalStatus<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>gender <span class="token operator">=</span> gender<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>maritalStatus <span class="token operator">=</span> maritalStatus<span class="token punctuation">;</span>    
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> gender<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getMaritalStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> maritalStatus<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>步骤 2</strong></p>
<p>为标准（Criteria）创建一个接口。</p>
<p>Criteria.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实现了 Criteria 接口的实体类。</p>
<p>CriteriaMale.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CriteriaMale</span> <span class="token keyword">implements</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> malePersons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"MALE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            malePersons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> malePersons<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>CriteriaFemale.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CriteriaFemale</span> <span class="token keyword">implements</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> femalePersons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"FEMALE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            femalePersons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> femalePersons<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>CriteriaSingle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CriteriaSingle</span> <span class="token keyword">implements</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> singlePersons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span><span class="token function">getMaritalStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span><span class="token string">"SINGLE"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            singlePersons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> singlePersons<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>AndCriteria.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AndCriteria</span> <span class="token keyword">implements</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">private</span> <span class="token class-name">Criteria</span> criteria<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Criteria</span> otherCriteria<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">AndCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span> criteria<span class="token punctuation">,</span> <span class="token class-name">Criteria</span> otherCriteria<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>criteria <span class="token operator">=</span> criteria<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>otherCriteria <span class="token operator">=</span> otherCriteria<span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> firstCriteriaPersons <span class="token operator">=</span> criteria<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">;</span>     
      <span class="token keyword">return</span> otherCriteria<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>firstCriteriaPersons<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>OrCriteria.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrCriteria</span> <span class="token keyword">implements</span> <span class="token class-name">Criteria</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">private</span> <span class="token class-name">Criteria</span> criteria<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Criteria</span> otherCriteria<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">OrCriteria</span><span class="token punctuation">(</span><span class="token class-name">Criteria</span> criteria<span class="token punctuation">,</span> <span class="token class-name">Criteria</span> otherCriteria<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>criteria <span class="token operator">=</span> criteria<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>otherCriteria <span class="token operator">=</span> otherCriteria<span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> <span class="token function">meetCriteria</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> firstCriteriaItems <span class="token operator">=</span> criteria<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> otherCriteriaItems <span class="token operator">=</span> otherCriteria<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> otherCriteriaItems<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>firstCriteriaItems<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
           firstCriteriaItems<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>  
      <span class="token keyword">return</span> firstCriteriaItems<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p>步骤4
使用不同的标准（Criteria）和它们的结合来过滤 Person 对象的列表。</p>
<p>CriteriaPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CriteriaPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Robert"</span><span class="token punctuation">,</span><span class="token string">"Male"</span><span class="token punctuation">,</span> <span class="token string">"Single"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">,</span><span class="token string">"Male"</span><span class="token punctuation">,</span> <span class="token string">"Married"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Laura"</span><span class="token punctuation">,</span><span class="token string">"Female"</span><span class="token punctuation">,</span> <span class="token string">"Married"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Diana"</span><span class="token punctuation">,</span><span class="token string">"Female"</span><span class="token punctuation">,</span> <span class="token string">"Single"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Mike"</span><span class="token punctuation">,</span><span class="token string">"Male"</span><span class="token punctuation">,</span> <span class="token string">"Single"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      persons<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">"Bobby"</span><span class="token punctuation">,</span><span class="token string">"Male"</span><span class="token punctuation">,</span> <span class="token string">"Single"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Criteria</span> male <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CriteriaMale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Criteria</span> female <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CriteriaFemale</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Criteria</span> single <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CriteriaSingle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Criteria</span> singleMale <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AndCriteria</span><span class="token punctuation">(</span>single<span class="token punctuation">,</span> male<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Criteria</span> singleOrFemale <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrCriteria</span><span class="token punctuation">(</span>single<span class="token punctuation">,</span> female<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Males: "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">printPersons</span><span class="token punctuation">(</span>male<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nFemales: "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">printPersons</span><span class="token punctuation">(</span>female<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nSingle Males: "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">printPersons</span><span class="token punctuation">(</span>singleMale<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nSingle Or Females: "</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">printPersons</span><span class="token punctuation">(</span>singleOrFemale<span class="token punctuation">.</span><span class="token function">meetCriteria</span><span class="token punctuation">(</span>persons<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">printPersons</span><span class="token punctuation">(</span><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Person</span><span class="token punctuation">></span></span> persons<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Person</span> person <span class="token operator">:</span> persons<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Person : [ Name : "</span> <span class="token operator">+</span> person<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
            <span class="token operator">+</span><span class="token string">", Gender : "</span> <span class="token operator">+</span> person<span class="token punctuation">.</span><span class="token function">getGender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
            <span class="token operator">+</span><span class="token string">", Marital Status : "</span> <span class="token operator">+</span> person<span class="token punctuation">.</span><span class="token function">getMaritalStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token operator">+</span><span class="token string">" ]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>      
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Males: 
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Robert, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> John, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Married <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Mike, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Bobby, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>

Females: 
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Laura, Gender <span class="token builtin class-name">:</span> Female, Marital Status <span class="token builtin class-name">:</span> Married <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Diana, Gender <span class="token builtin class-name">:</span> Female, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>

Single Males: 
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Robert, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Mike, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Bobby, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>

Single Or Females: 
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Robert, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Diana, Gender <span class="token builtin class-name">:</span> Female, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Mike, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Bobby, Gender <span class="token builtin class-name">:</span> Male, Marital Status <span class="token builtin class-name">:</span> Single <span class="token punctuation">]</span>
Person <span class="token builtin class-name">:</span> <span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Laura, Gender <span class="token builtin class-name">:</span> Female, Marital Status <span class="token builtin class-name">:</span> Married <span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="组合模式" tabindex="-1"><a class="header-anchor" href="#组合模式" aria-hidden="true">#</a> 组合模式</h3>
<p>组合模式（Composite Pattern），又叫部分整体模式，是用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次。这种类型的设计模式属于结构型模式，它创建了对象组的树形结构。</p>
<p>这种模式创建了一个包含自己对象组的类。该类提供了修改相同对象组的方式。</p>
<p>我们通过下面的实例来演示组合模式的用法。实例演示了一个组织中员工的层次结构。</p>
<h4 id="介绍-7" tabindex="-1"><a class="header-anchor" href="#介绍-7" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**将对象组合成树形结构以表示&quot;部分-整体&quot;的层次结构。组合模式使得用户对单个对象和组合对象的使用具有一致性。</p>
<p>**主要解决：**它在我们树型结构的问题中，模糊了简单元素和复杂元素的概念，客户程序可以像处理简单元素一样来处理复杂元素，从而使得客户程序与复杂元素的内部结构解耦。</p>
<p><strong>何时使用：</strong> 1、您想表示对象的部分-整体层次结构（树形结构）。 2、您希望用户忽略组合对象与单个对象的不同，用户将统一地使用组合结构中的所有对象。</p>
<p>**如何解决：**树枝和叶子实现统一接口，树枝内部组合该接口。</p>
<p>**关键代码：**树枝内部组合该接口，并且含有内部属性 List，里面放 Component。</p>
<p><strong>应用实例：</strong> 1、算术表达式包括操作数、操作符和另一个操作数，其中，另一个操作数也可以是操作数、操作符和另一个操作数。 2、在 JAVA AWT 和 SWING 中，对于 Button 和 Checkbox 是树叶，Container 是树枝。</p>
<p><strong>优点：</strong> 1、高层模块调用简单。 2、节点自由增加。</p>
<p>**缺点：**在使用组合模式时，其叶子和树枝的声明都是实现类，而不是接口，违反了依赖倒置原则。</p>
<p>**使用场景：**部分、整体场景，如树形菜单，文件、文件夹的管理。</p>
<blockquote>
<p>注意事项：定义时为具体类。</p>
</blockquote>
<h4 id="实现-8" tabindex="-1"><a class="header-anchor" href="#实现-8" aria-hidden="true">#</a> 实现</h4>
<p>我们有一个类 Employee，该类被当作组合模型类。CompositePatternDemo 类使用 Employee 类来添加部门层次结构，并打印所有员工。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Composite.jpg" alt="Composite"></p>
<p><strong>步骤 1</strong></p>
<p>创建 Employee 类，该类带有 Employee 对象的列表。</p>
<p>Employee.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> dept<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> salary<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> subordinates<span class="token punctuation">;</span>
 
   <span class="token comment">//构造函数</span>
   <span class="token keyword">public</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token class-name">String</span> dept<span class="token punctuation">,</span> <span class="token keyword">int</span> sal<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>dept <span class="token operator">=</span> dept<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>salary <span class="token operator">=</span> sal<span class="token punctuation">;</span>
      subordinates <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      subordinates<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      subordinates<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Employee</span><span class="token punctuation">></span></span> <span class="token function">getSubordinates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
     <span class="token keyword">return</span> subordinates<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token string">"Employee :[ Name : "</span><span class="token operator">+</span> name 
      <span class="token operator">+</span><span class="token string">", dept : "</span><span class="token operator">+</span> dept <span class="token operator">+</span> <span class="token string">", salary :"</span>
      <span class="token operator">+</span> salary<span class="token operator">+</span><span class="token string">" ]"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><p><strong>步骤 2</strong></p>
<p>使用 Employee 类来创建和打印员工的层次结构。</p>
<p>CompositePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CompositePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Employee</span> <span class="token constant">CEO</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">,</span><span class="token string">"CEO"</span><span class="token punctuation">,</span> <span class="token number">30000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Employee</span> headSales <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Robert"</span><span class="token punctuation">,</span><span class="token string">"Head Sales"</span><span class="token punctuation">,</span> <span class="token number">20000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Employee</span> headMarketing <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Michel"</span><span class="token punctuation">,</span><span class="token string">"Head Marketing"</span><span class="token punctuation">,</span> <span class="token number">20000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Employee</span> clerk1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Laura"</span><span class="token punctuation">,</span><span class="token string">"Marketing"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Employee</span> clerk2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Bob"</span><span class="token punctuation">,</span><span class="token string">"Marketing"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Employee</span> salesExecutive1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Richard"</span><span class="token punctuation">,</span><span class="token string">"Sales"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Employee</span> salesExecutive2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Employee</span><span class="token punctuation">(</span><span class="token string">"Rob"</span><span class="token punctuation">,</span><span class="token string">"Sales"</span><span class="token punctuation">,</span> <span class="token number">10000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token constant">CEO</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>headSales<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token constant">CEO</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>headMarketing<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      headSales<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>salesExecutive1<span class="token punctuation">)</span><span class="token punctuation">;</span>
      headSales<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>salesExecutive2<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      headMarketing<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>clerk1<span class="token punctuation">)</span><span class="token punctuation">;</span>
      headMarketing<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>clerk2<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//打印该组织的所有员工</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token constant">CEO</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> headEmployee <span class="token operator">:</span> <span class="token constant">CEO</span><span class="token punctuation">.</span><span class="token function">getSubordinates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>headEmployee<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Employee</span> employee <span class="token operator">:</span> headEmployee<span class="token punctuation">.</span><span class="token function">getSubordinates</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>        
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p><strong>步骤 3</strong></p>
<p>执行程序，输出结果为：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> John, dept <span class="token builtin class-name">:</span> CEO, salary :30000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Robert, dept <span class="token builtin class-name">:</span> Head Sales, salary :20000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Richard, dept <span class="token builtin class-name">:</span> Sales, salary :10000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Rob, dept <span class="token builtin class-name">:</span> Sales, salary :10000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Michel, dept <span class="token builtin class-name">:</span> Head Marketing, salary :20000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Laura, dept <span class="token builtin class-name">:</span> Marketing, salary :10000 <span class="token punctuation">]</span>
Employee :<span class="token punctuation">[</span> Name <span class="token builtin class-name">:</span> Bob, dept <span class="token builtin class-name">:</span> Marketing, salary :10000 <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="装饰器模式" tabindex="-1"><a class="header-anchor" href="#装饰器模式" aria-hidden="true">#</a> 装饰器模式</h3>
<p>装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。</p>
<p>这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。</p>
<p>我们通过下面的实例来演示装饰器模式的用法。其中，我们将把一个形状装饰上不同的颜色，同时又不改变形状类。</p>
<h4 id="介绍-8" tabindex="-1"><a class="header-anchor" href="#介绍-8" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**动态地给一个对象添加一些额外的职责。就增加功能来说，装饰器模式相比生成子类更为灵活。</p>
<p>**主要解决：**一般的，我们为了扩展一个类经常使用继承方式实现，由于继承为类引入静态特征，并且随着扩展功能的增多，子类会很膨胀。</p>
<p>**何时使用：**在不想增加很多子类的情况下扩展类。</p>
<p>**如何解决：**将具体功能职责划分，同时继承装饰者模式。</p>
<p><strong>关键代码：</strong> 1、Component 类充当抽象角色，不应该具体实现。 2、修饰类引用和继承 Component 类，具体扩展类重写父类方法。</p>
<p><strong>应用实例：</strong> 1、孙悟空有 72 变，当他变成&quot;庙宇&quot;后，他的根本还是一只猴子，但是他又有了庙宇的功能。 2、不论一幅画有没有画框都可以挂在墙上，但是通常都是有画框的，并且实际上是画框被挂在墙上。在挂在墙上之前，画可以被蒙上玻璃，装到框子里；这时画、玻璃和画框形成了一个物体。</p>
<p>**优点：**装饰类和被装饰类可以独立发展，不会相互耦合，装饰模式是继承的一个替代模式，装饰模式可以动态扩展一个实现类的功能。</p>
<p>**缺点：**多层装饰比较复杂。</p>
<p><strong>使用场景：</strong> 1、扩展一个类的功能。 2、动态增加功能，动态撤销。</p>
<blockquote>
<p>注意事项：可代替继承。</p>
</blockquote>
<h4 id="实现-9" tabindex="-1"><a class="header-anchor" href="#实现-9" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Shape 接口和实现了 Shape 接口的实体类。然后我们创建一个实现了 Shape 接口的抽象装饰类 ShapeDecorator，并把 Shape 对象作为它的实例变量。</p>
<p>RedShapeDecorator 是实现了 ShapeDecorator 的实体类。</p>
<p>DecoratorPatternDemo 类使用 RedShapeDecorator 来装饰 Shape 对象。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Decorator.jpg" alt="Decorator"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口：</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>Rectangle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Shape: Rectangle"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Shape: Circle"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实现了 Shape 接口的抽象装饰类。</p>
<p>ShapeDecorator.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">ShapeDecorator</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">protected</span> <span class="token class-name">Shape</span> decoratedShape<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ShapeDecorator</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> decoratedShape<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>decoratedShape <span class="token operator">=</span> decoratedShape<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      decoratedShape<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建扩展了 ShapeDecorator 类的实体装饰类。</p>
<p>RedShapeDecorator.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedShapeDecorator</span> <span class="token keyword">extends</span> <span class="token class-name">ShapeDecorator</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">RedShapeDecorator</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> decoratedShape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">super</span><span class="token punctuation">(</span>decoratedShape<span class="token punctuation">)</span><span class="token punctuation">;</span>     
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      decoratedShape<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>         
      <span class="token function">setRedBorder</span><span class="token punctuation">(</span>decoratedShape<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">setRedBorder</span><span class="token punctuation">(</span><span class="token class-name">Shape</span> decoratedShape<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Border Color: Red"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>步骤 5</strong></p>
<p>使用 RedShapeDecorator 来装饰 Shape 对象。</p>
<p>DecoratorPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DecoratorPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token class-name">Shape</span> circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">ShapeDecorator</span> redCircle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedShapeDecorator</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">ShapeDecorator</span> redRectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedShapeDecorator</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">//Shape redCircle = new RedShapeDecorator(new Circle());</span>
      <span class="token comment">//Shape redRectangle = new RedShapeDecorator(new Rectangle());</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Circle with normal border"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      circle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nCircle of red border"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      redCircle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"\nRectangle of red border"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      redRectangle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>步骤 6</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Circle with normal border
Shape: Circle

Circle of red border
Shape: Circle
Border Color: Red

Rectangle of red border
Shape: Rectangle
Border Color: Red
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="外观模式" tabindex="-1"><a class="header-anchor" href="#外观模式" aria-hidden="true">#</a> 外观模式</h3>
<p>外观模式（Facade Pattern）隐藏系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口。这种类型的设计模式属于结构型模式，它向现有的系统添加一个接口，来隐藏系统的复杂性。</p>
<p>这种模式涉及到一个单一的类，该类提供了客户端请求的简化方法和对现有系统类方法的委托调用。</p>
<h4 id="介绍-9" tabindex="-1"><a class="header-anchor" href="#介绍-9" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。</p>
<p>**主要解决：**降低访问复杂系统的内部子系统时的复杂度，简化客户端之间的接口。</p>
<p><strong>何时使用：</strong> 1、客户端不需要知道系统内部的复杂联系，整个系统只需提供一个&quot;接待员&quot;即可。 2、定义系统的入口。</p>
<p>**如何解决：**客户端不与系统耦合，外观类与系统耦合。</p>
<p>**关键代码：**在客户端和复杂系统之间再加一层，这一层将调用顺序、依赖关系等处理好。</p>
<p><strong>应用实例：</strong> 1、去医院看病，可能要去挂号、门诊、划价、取药，让患者或患者家属觉得很复杂，如果有提供接待人员，只让接待人员来处理，就很方便。 2、JAVA 的三层开发模式。</p>
<p><strong>优点：</strong> 1、减少系统相互依赖。 2、提高灵活性。 3、提高了安全性。</p>
<p>**缺点：**不符合开闭原则，如果要改东西很麻烦，继承重写都不合适。</p>
<p><strong>使用场景：</strong> 1、为复杂的模块或子系统提供外界访问的模块。 2、子系统相对独立。 3、预防低水平人员带来的风险。</p>
<blockquote>
<p>注意事项：在层次化结构中，可以使用外观模式定义系统中每一层的入口。</p>
</blockquote>
<h4 id="实现-10" tabindex="-1"><a class="header-anchor" href="#实现-10" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Shape 接口和实现了 Shape 接口的实体类。下一步是定义一个外观类 ShapeMaker。</p>
<p>ShapeMaker 类使用实体类来代表用户对这些类的调用。FacadePatternDemo 类使用 ShapeMaker 类来显示结果。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Facade.jpg" alt="Facade"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口。</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>Rectangle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Rectangle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Rectangle::draw()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Square.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Square</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Square::draw()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Circle::draw()"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建一个外观类。</p>
<p>ShapeMaker.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeMaker</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> circle<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> rectangle<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Shape</span> square<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ShapeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      rectangle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Rectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      square <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Square</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      circle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      rectangle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">drawSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      square<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用该外观类画出各种类型的形状。</p>
<p>FacadePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FacadePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">ShapeMaker</span> shapeMaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ShapeMaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawCircle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawRectangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      shapeMaker<span class="token punctuation">.</span><span class="token function">drawSquare</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Circle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span>
Rectangle::draw<span class="token punctuation">(</span><span class="token punctuation">)</span>
Square::draw<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="享元模式" tabindex="-1"><a class="header-anchor" href="#享元模式" aria-hidden="true">#</a> 享元模式</h3>
<p>享元模式（Flyweight Pattern）主要用于减少创建对象的数量，以减少内存占用和提高性能。这种类型的设计模式属于结构型模式，它提供了减少对象数量从而改善应用所需的对象结构的方式。</p>
<p>享元模式尝试重用现有的同类对象，如果未找到匹配的对象，则创建新对象。我们将通过创建 5 个对象来画出 20 个分布于不同位置的圆来演示这种模式。由于只有 5 种可用的颜色，所以 color 属性被用来检查现有的 Circle 对象。</p>
<h4 id="介绍-10" tabindex="-1"><a class="header-anchor" href="#介绍-10" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**运用共享技术有效地支持大量细粒度的对象。</p>
<p>**主要解决：**在有大量对象时，有可能会造成内存溢出，我们把其中共同的部分抽象出来，如果有相同的业务请求，直接返回在内存中已有的对象，避免重新创建。</p>
<p><strong>何时使用：</strong> 1、系统中有大量对象。 2、这些对象消耗大量内存。 3、这些对象的状态大部分可以外部化。 4、这些对象可以按照内蕴状态分为很多组，当把外蕴对象从对象中剔除出来时，每一组对象都可以用一个对象来代替。 5、系统不依赖于这些对象身份，这些对象是不可分辨的。</p>
<p>**如何解决：**用唯一标识码判断，如果在内存中有，则返回这个唯一标识码所标识的对象。</p>
<p>**关键代码：**用 HashMap 存储这些对象。</p>
<p><strong>应用实例：</strong> 1、JAVA 中的 String，如果有则返回，如果没有则创建一个字符串保存在字符串缓存池里面。 2、数据库的连接池。</p>
<p>**优点：**大大减少对象的创建，降低系统的内存，使效率提高。</p>
<p>**缺点：**提高了系统的复杂度，需要分离出外部状态和内部状态，而且外部状态具有固有化的性质，不应该随着内部状态的变化而变化，否则会造成系统的混乱。</p>
<p><strong>使用场景：</strong> 1、系统有大量相似对象。 2、需要缓冲池的场景。</p>
<blockquote>
<p>注意事项： 1、注意划分外部状态和内部状态，否则可能会引起线程安全问题。 2、这些类必须有一个工厂对象加以控制。</p>
</blockquote>
<h4 id="实现-11" tabindex="-1"><a class="header-anchor" href="#实现-11" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Shape 接口和实现了 Shape 接口的实体类 Circle。下一步是定义工厂类 ShapeFactory。</p>
<p>ShapeFactory 有一个 Circle 的 HashMap，其中键名为 Circle 对象的颜色。无论何时接收到请求，都会创建一个特定颜色的圆。ShapeFactory 检查它的 HashMap 中的 circle 对象，如果找到 Circle 对象，则返回该对象，否则将创建一个存储在 hashmap 中以备后续使用的新对象，并把该对象返回到客户端。</p>
<p>FlyWeightPatternDemo 类使用 ShapeFactory 来获取 Shape 对象。它将向 ShapeFactory 传递信息（red / green / blue/ black / white），以便获取它所需对象的颜色。</p>
<p><img src="@source/Back/imgs/Design-Pattern/FlyWeight.jpg" alt="FlyWeight"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口。</p>
<p>Shape.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>Circle.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">Shape</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> color<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> x<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> y<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> radius<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>color <span class="token operator">=</span> color<span class="token punctuation">;</span>     
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setX</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>x <span class="token operator">=</span> x<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setY</span><span class="token punctuation">(</span><span class="token keyword">int</span> y<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>y <span class="token operator">=</span> y<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setRadius</span><span class="token punctuation">(</span><span class="token keyword">int</span> radius<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>radius <span class="token operator">=</span> radius<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Circle: Draw() [Color : "</span> <span class="token operator">+</span> color 
         <span class="token operator">+</span><span class="token string">", x : "</span> <span class="token operator">+</span> x <span class="token operator">+</span><span class="token string">", y :"</span> <span class="token operator">+</span> y <span class="token operator">+</span><span class="token string">", radius :"</span> <span class="token operator">+</span> radius<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建一个工厂，生成基于给定信息的实体类的对象。</p>
<p>ShapeFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">HashMap</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ShapeFactory</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Shape</span><span class="token punctuation">></span></span> circleMap <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Shape</span> <span class="token function">getCircle</span><span class="token punctuation">(</span><span class="token class-name">String</span> color<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Circle</span> circle <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Circle</span><span class="token punctuation">)</span>circleMap<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token keyword">if</span><span class="token punctuation">(</span>circle <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         circle <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Circle</span><span class="token punctuation">(</span>color<span class="token punctuation">)</span><span class="token punctuation">;</span>
         circleMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>color<span class="token punctuation">,</span> circle<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Creating circle of color : "</span> <span class="token operator">+</span> color<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> circle<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用该工厂，通过传递颜色信息来获取实体类的对象。</p>
<p>FlyweightPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FlyweightPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> colors<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">=</span> 
      <span class="token punctuation">{</span> <span class="token string">"Red"</span><span class="token punctuation">,</span> <span class="token string">"Green"</span><span class="token punctuation">,</span> <span class="token string">"Blue"</span><span class="token punctuation">,</span> <span class="token string">"White"</span><span class="token punctuation">,</span> <span class="token string">"Black"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token operator">++</span>i<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">Circle</span> circle <span class="token operator">=</span> 
            <span class="token punctuation">(</span><span class="token class-name">Circle</span><span class="token punctuation">)</span><span class="token class-name">ShapeFactory</span><span class="token punctuation">.</span><span class="token function">getCircle</span><span class="token punctuation">(</span><span class="token function">getRandomColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         circle<span class="token punctuation">.</span><span class="token function">setX</span><span class="token punctuation">(</span><span class="token function">getRandomX</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         circle<span class="token punctuation">.</span><span class="token function">setY</span><span class="token punctuation">(</span><span class="token function">getRandomY</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         circle<span class="token punctuation">.</span><span class="token function">setRadius</span><span class="token punctuation">(</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         circle<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">String</span> <span class="token function">getRandomColor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> colors<span class="token punctuation">[</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span>colors<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getRandomX</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">100</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">getRandomY</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Creating circle of color <span class="token builtin class-name">:</span> Black
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Black, x <span class="token builtin class-name">:</span> <span class="token number">36</span>, y :71, radius :100
Creating circle of color <span class="token builtin class-name">:</span> Green
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">27</span>, y :27, radius :100
Creating circle of color <span class="token builtin class-name">:</span> White
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> White, x <span class="token builtin class-name">:</span> <span class="token number">64</span>, y :10, radius :100
Creating circle of color <span class="token builtin class-name">:</span> Red
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Red, x <span class="token builtin class-name">:</span> <span class="token number">15</span>, y :44, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">19</span>, y :10, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">94</span>, y :32, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> White, x <span class="token builtin class-name">:</span> <span class="token number">69</span>, y :98, radius :100
Creating circle of color <span class="token builtin class-name">:</span> Blue
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Blue, x <span class="token builtin class-name">:</span> <span class="token number">13</span>, y :4, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">21</span>, y :21, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Blue, x <span class="token builtin class-name">:</span> <span class="token number">55</span>, y :86, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> White, x <span class="token builtin class-name">:</span> <span class="token number">90</span>, y :70, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">78</span>, y :3, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">64</span>, y :89, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Blue, x <span class="token builtin class-name">:</span> <span class="token number">3</span>, y :91, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Blue, x <span class="token builtin class-name">:</span> <span class="token number">62</span>, y :82, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">97</span>, y :61, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">86</span>, y :12, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Green, x <span class="token builtin class-name">:</span> <span class="token number">38</span>, y :93, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Red, x <span class="token builtin class-name">:</span> <span class="token number">76</span>, y :82, radius :100
Circle: Draw<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span>Color <span class="token builtin class-name">:</span> Blue, x <span class="token builtin class-name">:</span> <span class="token number">95</span>, y :82, radius :100
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h3>
<p>在代理模式（Proxy Pattern）中，一个类代表另一个类的功能。这种类型的设计模式属于结构型模式。</p>
<p>在代理模式中，我们创建具有现有对象的对象，以便向外界提供功能接口。</p>
<h4 id="介绍-11" tabindex="-1"><a class="header-anchor" href="#介绍-11" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**为其他对象提供一种代理以控制对这个对象的访问。</p>
<p>**主要解决：**在直接访问对象时带来的问题，比如说：要访问的对象在远程的机器上。在面向对象系统中，有些对象由于某些原因（比如对象创建开销很大，或者某些操作需要安全控制，或者需要进程外的访问），直接访问会给使用者或者系统结构带来很多麻烦，我们可以在访问此对象时加上一个对此对象的访问层。</p>
<p>**何时使用：**想在访问一个类时做一些控制。</p>
<p>**如何解决：**增加中间层。</p>
<p>**关键代码：**实现与被代理类组合。</p>
<p><strong>应用实例：</strong> 1、Windows 里面的快捷方式。 2、猪八戒去找高翠兰结果是孙悟空变的，可以这样理解：把高翠兰的外貌抽象出来，高翠兰本人和孙悟空都实现了这个接口，猪八戒访问高翠兰的时候看不出来这个是孙悟空，所以说孙悟空是高翠兰代理类。 3、买火车票不一定在火车站买，也可以去代售点。 4、一张支票或银行存单是账户中资金的代理。支票在市场交易中用来代替现金，并提供对签发人账号上资金的控制。 5、spring aop。</p>
<p><strong>优点：</strong> 1、职责清晰。 2、高扩展性。 3、智能化。</p>
<p><strong>缺点：</strong> 1、由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。 2、实现代理模式需要额外的工作，有些代理模式的实现非常复杂。</p>
<p>**使用场景：**按职责来划分，通常有以下使用场景： 1、远程代理。 2、虚拟代理。 3、Copy-on-Write 代理。 4、保护（Protect or Access）代理。 5、Cache代理。 6、防火墙（Firewall）代理。 7、同步化（Synchronization）代理。 8、智能引用（Smart Reference）代理。</p>
<blockquote>
<p>注意事项： 1、和适配器模式的区别：适配器模式主要改变所考虑对象的接口，而代理模式不能改变所代理类的接口。 2、和装饰器模式的区别：装饰器模式为了增强功能，而代理模式是为了加以控制。</p>
</blockquote>
<h4 id="实现-12" tabindex="-1"><a class="header-anchor" href="#实现-12" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 Image 接口和实现了 Image 接口的实体类。ProxyImage 是一个代理类，减少 RealImage 对象加载的内存占用。</p>
<p>ProxyPatternDemo 类使用 ProxyImage 来获取要加载的 Image 对象，并按照需求进行显示。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Proxy.jpg" alt="Proxy"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口。</p>
<p>Image.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Image</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>RealImage.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RealImage</span> <span class="token keyword">implements</span> <span class="token class-name">Image</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">private</span> <span class="token class-name">String</span> fileName<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">RealImage</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>fileName <span class="token operator">=</span> fileName<span class="token punctuation">;</span>
      <span class="token function">loadFromDisk</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Displaying "</span> <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">loadFromDisk</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Loading "</span> <span class="token operator">+</span> fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>ProxyImage.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyImage</span> <span class="token keyword">implements</span> <span class="token class-name">Image</span><span class="token punctuation">{</span>
 
   <span class="token keyword">private</span> <span class="token class-name">RealImage</span> realImage<span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> fileName<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ProxyImage</span><span class="token punctuation">(</span><span class="token class-name">String</span> fileName<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>fileName <span class="token operator">=</span> fileName<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>realImage <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         realImage <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RealImage</span><span class="token punctuation">(</span>fileName<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      realImage<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 3</strong></p>
<p>当被请求时，使用 ProxyImage 来获取 RealImage 类的对象。</p>
<p>ProxyPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyPatternDemo</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Image</span> image <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyImage</span><span class="token punctuation">(</span><span class="token string">"test_10mb.jpg"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">// 图像将从磁盘加载</span>
      image<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// 图像不需要从磁盘加载</span>
      image<span class="token punctuation">.</span><span class="token function">display</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Loading test_10mb.jpg
Displaying test_10mb.jpg

Displaying test_10mb.jpg
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="行为型模式" tabindex="-1"><a class="header-anchor" href="#行为型模式" aria-hidden="true">#</a> 行为型模式</h2>
<h3 id="责任链模式" tabindex="-1"><a class="header-anchor" href="#责任链模式" aria-hidden="true">#</a> 责任链模式</h3>
<p>顾名思义，责任链模式（Chain of Responsibility Pattern）为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。这种类型的设计模式属于行为型模式。</p>
<p>在这种模式中，通常每个接收者都包含对另一个接收者的引用。如果一个对象不能处理该请求，那么它会把相同的请求传给下一个接收者，依此类推。</p>
<h4 id="介绍-12" tabindex="-1"><a class="header-anchor" href="#介绍-12" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**避免请求发送者与接收者耦合在一起，让多个对象都有可能接收请求，将这些对象连接成一条链，并且沿着这条链传递请求，直到有对象处理它为止。</p>
<p>**主要解决：**职责链上的处理者负责处理请求，客户只需要将请求发送到职责链上即可，无须关心请求的处理细节和请求的传递，所以职责链将请求的发送者和请求的处理者解耦了。</p>
<p>**何时使用：**在处理消息的时候以过滤很多道。</p>
<p>**如何解决：**拦截的类都实现统一接口。</p>
<p>**关键代码：**Handler 里面聚合它自己，在 HandlerRequest 里判断是否合适，如果没达到条件则向下传递，向谁传递之前 set 进去。</p>
<p><strong>应用实例：</strong> 1、红楼梦中的&quot;击鼓传花&quot;。 2、JS 中的事件冒泡。 3、JAVA WEB 中 Apache Tomcat 对 Encoding 的处理，Struts2 的拦截器，jsp servlet 的 Filter。</p>
<p><strong>优点：</strong> 1、降低耦合度。它将请求的发送者和接收者解耦。 2、简化了对象。使得对象不需要知道链的结构。 3、增强给对象指派职责的灵活性。通过改变链内的成员或者调动它们的次序，允许动态地新增或者删除责任。 4、增加新的请求处理类很方便。</p>
<p><strong>缺点：</strong> 1、不能保证请求一定被接收。 2、系统性能将受到一定影响，而且在进行代码调试时不太方便，可能会造成循环调用。 3、可能不容易观察运行时的特征，有碍于除错。</p>
<p><strong>使用场景：</strong> 1、有多个对象可以处理同一个请求，具体哪个对象处理该请求由运行时刻自动确定。 2、在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。 3、可动态指定一组对象处理请求。</p>
<blockquote>
<p>注意事项：在 JAVA WEB 中遇到很多应用。</p>
</blockquote>
<h4 id="实现-13" tabindex="-1"><a class="header-anchor" href="#实现-13" aria-hidden="true">#</a> 实现</h4>
<p>我们创建抽象类 AbstractLogger，带有详细的日志记录级别。然后我们创建三种类型的记录器，都扩展了 AbstractLogger。每个记录器消息的级别是否属于自己的级别，如果是则相应地打印出来，否则将不打印并把消息传给下一个记录器。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Chain of Responsibility.jpg" alt="Chain of Responsibility"></p>
<p><strong>步骤 1</strong></p>
<p>创建抽象的记录器类。</p>
<p>AbstractLogger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractLogger</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">INFO</span> <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">DEBUG</span> <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token constant">ERROR</span> <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
 
   <span class="token keyword">protected</span> <span class="token keyword">int</span> level<span class="token punctuation">;</span>
 
   <span class="token comment">//责任链中的下一个元素</span>
   <span class="token keyword">protected</span> <span class="token class-name">AbstractLogger</span> nextLogger<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setNextLogger</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span> nextLogger<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>nextLogger <span class="token operator">=</span> nextLogger<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">logMessage</span><span class="token punctuation">(</span><span class="token keyword">int</span> level<span class="token punctuation">,</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">&lt;=</span> level<span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token function">write</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>nextLogger <span class="token operator">!=</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         nextLogger<span class="token punctuation">.</span><span class="token function">logMessage</span><span class="token punctuation">(</span>level<span class="token punctuation">,</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">abstract</span> <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建扩展了该记录器类的实体类。</p>
<p>ConsoleLogger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConsoleLogger</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractLogger</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ConsoleLogger</span><span class="token punctuation">(</span><span class="token keyword">int</span> level<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>    
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Standard Console::Logger: "</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>ErrorLogger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ErrorLogger</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractLogger</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">ErrorLogger</span><span class="token punctuation">(</span><span class="token keyword">int</span> level<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>    
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Error Console::Logger: "</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>FileLogger.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FileLogger</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractLogger</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">FileLogger</span><span class="token punctuation">(</span><span class="token keyword">int</span> level<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">write</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span> <span class="token punctuation">{</span>    
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"File::Logger: "</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建不同类型的记录器。赋予它们不同的错误级别，并在每个记录器中设置下一个记录器。每个记录器中的下一个记录器代表的是链的一部分。</p>
<p>ChainPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChainPatternDemo</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">AbstractLogger</span> <span class="token function">getChainOfLoggers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 
      <span class="token class-name">AbstractLogger</span> errorLogger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ErrorLogger</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">AbstractLogger</span> fileLogger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileLogger</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">DEBUG</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">AbstractLogger</span> consoleLogger <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ConsoleLogger</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">INFO</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      errorLogger<span class="token punctuation">.</span><span class="token function">setNextLogger</span><span class="token punctuation">(</span>fileLogger<span class="token punctuation">)</span><span class="token punctuation">;</span>
      fileLogger<span class="token punctuation">.</span><span class="token function">setNextLogger</span><span class="token punctuation">(</span>consoleLogger<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token keyword">return</span> errorLogger<span class="token punctuation">;</span>  
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">AbstractLogger</span> loggerChain <span class="token operator">=</span> <span class="token function">getChainOfLoggers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      loggerChain<span class="token punctuation">.</span><span class="token function">logMessage</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">INFO</span><span class="token punctuation">,</span> <span class="token string">"This is an information."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      loggerChain<span class="token punctuation">.</span><span class="token function">logMessage</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">DEBUG</span><span class="token punctuation">,</span> 
         <span class="token string">"This is a debug level information."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      loggerChain<span class="token punctuation">.</span><span class="token function">logMessage</span><span class="token punctuation">(</span><span class="token class-name">AbstractLogger</span><span class="token punctuation">.</span><span class="token constant">ERROR</span><span class="token punctuation">,</span> 
         <span class="token string">"This is an error information."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
Standard Console::Logger: This is an information.
File::Logger: This is a debug level information.
Standard Console::Logger: This is a debug level information.
Error Console::Logger: This is an error information.
File::Logger: This is an error information.
Standard Console::Logger: This is an error information.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="命令模式" tabindex="-1"><a class="header-anchor" href="#命令模式" aria-hidden="true">#</a> 命令模式</h3>
<p>命令模式（Command Pattern）是一种数据驱动的设计模式，它属于行为型模式。请求以命令的形式包裹在对象中，并传给调用对象。调用对象寻找可以处理该命令的合适的对象，并把该命令传给相应的对象，该对象执行命令。</p>
<h4 id="介绍-13" tabindex="-1"><a class="header-anchor" href="#介绍-13" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**将一个请求封装成一个对象，从而使您可以用不同的请求对客户进行参数化。</p>
<p>**主要解决：**在软件系统中，行为请求者与行为实现者通常是一种紧耦合的关系，但某些场合，比如需要对行为进行记录、撤销或重做、事务等处理时，这种无法抵御变化的紧耦合的设计就不太合适。</p>
<p>**何时使用：**在某些场合，比如要对行为进行&quot;记录、撤销/重做、事务&quot;等处理，这种无法抵御变化的紧耦合是不合适的。在这种情况下，如何将&quot;行为请求者&quot;与&quot;行为实现者&quot;解耦？将一组行为抽象为对象，可以实现二者之间的松耦合。</p>
<p>**如何解决：**通过调用者调用接受者执行命令，顺序：调用者→命令→接受者。</p>
<p>**关键代码：**定义三个角色：1、received 真正的命令执行对象 2、Command 3、invoker 使用命令对象的入口</p>
<p>**应用实例：**struts 1 中的 action 核心控制器 ActionServlet 只有一个，相当于 Invoker，而模型层的类会随着不同的应用有不同的模型类，相当于具体的 Command。</p>
<p><strong>优点：</strong> 1、降低了系统耦合度。 2、新的命令可以很容易添加到系统中去。</p>
<p>**缺点：**使用命令模式可能会导致某些系统有过多的具体命令类。</p>
<p>**使用场景：**认为是命令的地方都可以使用命令模式，比如： 1、GUI 中每一个按钮都是一条命令。 2、模拟 CMD。</p>
<blockquote>
<p>注意事项：系统需要支持命令的撤销(Undo)操作和恢复(Redo)操作，也可以考虑使用命令模式，见命令模式的扩展。</p>
</blockquote>
<p>命令模式结构示意图:</p>
<p><img src="@source/Back/imgs/Design-Pattern/命令模式结构.jpg" alt="命令模式结构"></p>
<h4 id="实现-14" tabindex="-1"><a class="header-anchor" href="#实现-14" aria-hidden="true">#</a> 实现</h4>
<p>我们首先创建作为命令的接口 Order，然后创建作为请求的 Stock 类。实体命令类 BuyStock 和 SellStock，实现了 Order 接口，将执行实际的命令处理。创建作为调用对象的类 Broker，它接受订单并能下订单。</p>
<p>Broker 对象使用命令模式，基于命令的类型确定哪个对象执行哪个命令。CommandPatternDemo 类使用 Broker 类来演示命令模式。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Command.jpg" alt="Command"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个命令接口。</p>
<p>Order.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
   <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建一个请求类。</p>
<p>Stock.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Stock</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token string">"ABC"</span><span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> quantity <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Stock [ Name: "</span><span class="token operator">+</span>name<span class="token operator">+</span>"<span class="token punctuation">,</span> 
         <span class="token class-name">Quantity</span><span class="token operator">:</span> <span class="token string">" + quantity +"</span> <span class="token punctuation">]</span> bought"<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Stock [ Name: "</span><span class="token operator">+</span>name<span class="token operator">+</span>"<span class="token punctuation">,</span> 
         <span class="token class-name">Quantity</span><span class="token operator">:</span> <span class="token string">" + quantity +"</span> <span class="token punctuation">]</span> sold"<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实现了 Order 接口的实体类。</p>
<p>BuyStock.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BuyStock</span> <span class="token keyword">implements</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Stock</span> abcStock<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">BuyStock</span><span class="token punctuation">(</span><span class="token class-name">Stock</span> abcStock<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>abcStock <span class="token operator">=</span> abcStock<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      abcStock<span class="token punctuation">.</span><span class="token function">buy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>SellStock.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SellStock</span> <span class="token keyword">implements</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Stock</span> abcStock<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">SellStock</span><span class="token punctuation">(</span><span class="token class-name">Stock</span> abcStock<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>abcStock <span class="token operator">=</span> abcStock<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      abcStock<span class="token punctuation">.</span><span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建命令调用类。</p>
<p>Broker.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Broker</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span> orderList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Order</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token class-name">Order</span> order<span class="token punctuation">)</span><span class="token punctuation">{</span>
      orderList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>order<span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">placeOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Order</span> order <span class="token operator">:</span> orderList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         order<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      orderList<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 5</strong></p>
<p>使用 Broker 类来接受并执行命令。</p>
<p>CommandPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CommandPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Stock</span> abcStock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Stock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">BuyStock</span> buyStockOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BuyStock</span><span class="token punctuation">(</span>abcStock<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">SellStock</span> sellStockOrder <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SellStock</span><span class="token punctuation">(</span>abcStock<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">Broker</span> broker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Broker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      broker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span>buyStockOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
      broker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span>sellStockOrder<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      broker<span class="token punctuation">.</span><span class="token function">placeOrders</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 6</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Stock <span class="token punctuation">[</span> Name: ABC, Quantity: <span class="token number">10</span> <span class="token punctuation">]</span> bought
Stock <span class="token punctuation">[</span> Name: ABC, Quantity: <span class="token number">10</span> <span class="token punctuation">]</span> sold
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="解释器模式" tabindex="-1"><a class="header-anchor" href="#解释器模式" aria-hidden="true">#</a> 解释器模式</h3>
<p>解释器模式（Interpreter Pattern）提供了评估语言的语法或表达式的方式，它属于行为型模式。这种模式实现了一个表达式接口，该接口解释一个特定的上下文。这种模式被用在 SQL 解析、符号处理引擎等。</p>
<h4 id="介绍-14" tabindex="-1"><a class="header-anchor" href="#介绍-14" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**给定一个语言，定义它的文法表示，并定义一个解释器，这个解释器使用该标识来解释语言中的句子。</p>
<p>**主要解决：**对于一些固定文法构建一个解释句子的解释器。</p>
<p>**何时使用：**如果一种特定类型的问题发生的频率足够高，那么可能就值得将该问题的各个实例表述为一个简单语言中的句子。这样就可以构建一个解释器，该解释器通过解释这些句子来解决该问题。</p>
<p>**如何解决：**构建语法树，定义终结符与非终结符。</p>
<p>**关键代码：**构建环境类，包含解释器之外的一些全局信息，一般是 HashMap。</p>
<p>**应用实例：**编译器、运算表达式计算。</p>
<p><strong>优点：</strong> 1、可扩展性比较好，灵活。 2、增加了新的解释表达式的方式。 3、易于实现简单文法。</p>
<p><strong>缺点：</strong> 1、可利用场景比较少。 2、对于复杂的文法比较难维护。 3、解释器模式会引起类膨胀。 4、解释器模式采用递归调用方法。</p>
<p><strong>使用场景：</strong> 1、可以将一个需要解释执行的语言中的句子表示为一个抽象语法树。 2、一些重复出现的问题可以用一种简单的语言来进行表达。 3、一个简单语法需要解释的场景。</p>
<blockquote>
<p>注意事项：可利用场景比较少，JAVA 中如果碰到可以用 expression4J 代替。</p>
</blockquote>
<h4 id="实现-15" tabindex="-1"><a class="header-anchor" href="#实现-15" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个接口 Expression 和实现了 Expression 接口的实体类。定义作为上下文中主要解释器的 TerminalExpression 类。其他的类 OrExpression、AndExpression 用于创建组合式表达式。</p>
<p>InterpreterPatternDemo，我们的演示类使用 Expression 类创建规则和演示表达式的解析。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Interpreter.jpg" alt="Interpreter"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个表达式接口。</p>
<p>Expression.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现了上述接口的实体类。</p>
<p>TerminalExpression.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TerminalExpression</span> <span class="token keyword">implements</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token class-name">String</span> data<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">TerminalExpression</span><span class="token punctuation">(</span><span class="token class-name">String</span> data<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>OrExpression.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrExpression</span> <span class="token keyword">implements</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>
    
   <span class="token keyword">private</span> <span class="token class-name">Expression</span> expr1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Expression</span> expr2 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">OrExpression</span><span class="token punctuation">(</span><span class="token class-name">Expression</span> expr1<span class="token punctuation">,</span> <span class="token class-name">Expression</span> expr2<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">this</span><span class="token punctuation">.</span>expr1 <span class="token operator">=</span> expr1<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>expr2 <span class="token operator">=</span> expr2<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>      
      <span class="token keyword">return</span> expr1<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">||</span> expr2<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>AndExpression.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AndExpression</span> <span class="token keyword">implements</span> <span class="token class-name">Expression</span> <span class="token punctuation">{</span>
    
   <span class="token keyword">private</span> <span class="token class-name">Expression</span> expr1 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token class-name">Expression</span> expr2 <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">AndExpression</span><span class="token punctuation">(</span><span class="token class-name">Expression</span> expr1<span class="token punctuation">,</span> <span class="token class-name">Expression</span> expr2<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token keyword">this</span><span class="token punctuation">.</span>expr1 <span class="token operator">=</span> expr1<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>expr2 <span class="token operator">=</span> expr2<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">interpret</span><span class="token punctuation">(</span><span class="token class-name">String</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>      
      <span class="token keyword">return</span> expr1<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> expr2<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>步骤 3</strong></p>
<p>InterpreterPatternDemo 使用 Expression 类来创建规则，并解析它们。</p>
<p>InterpreterPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">InterpreterPatternDemo</span> <span class="token punctuation">{</span>
 
   <span class="token comment">//规则：Robert 和 John 是男性</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Expression</span> <span class="token function">getMaleExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">Expression</span> robert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TerminalExpression</span><span class="token punctuation">(</span><span class="token string">"Robert"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Expression</span> john <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TerminalExpression</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">OrExpression</span><span class="token punctuation">(</span>robert<span class="token punctuation">,</span> john<span class="token punctuation">)</span><span class="token punctuation">;</span>    
   <span class="token punctuation">}</span>
 
   <span class="token comment">//规则：Julie 是一个已婚的女性</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Expression</span> <span class="token function">getMarriedWomanExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">Expression</span> julie <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TerminalExpression</span><span class="token punctuation">(</span><span class="token string">"Julie"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Expression</span> married <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TerminalExpression</span><span class="token punctuation">(</span><span class="token string">"Married"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AndExpression</span><span class="token punctuation">(</span>julie<span class="token punctuation">,</span> married<span class="token punctuation">)</span><span class="token punctuation">;</span>    
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Expression</span> isMale <span class="token operator">=</span> <span class="token function">getMaleExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">Expression</span> isMarriedWoman <span class="token operator">=</span> <span class="token function">getMarriedWomanExpression</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"John is male? "</span> <span class="token operator">+</span> isMale<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Julie is a married women? "</span> 
      <span class="token operator">+</span> isMarriedWoman<span class="token punctuation">.</span><span class="token function">interpret</span><span class="token punctuation">(</span><span class="token string">"Married Julie"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
John is male? <span class="token boolean">true</span>
Julie is a married women? <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="迭代器模式" tabindex="-1"><a class="header-anchor" href="#迭代器模式" aria-hidden="true">#</a> 迭代器模式</h3>
<p>迭代器模式（Iterator Pattern）是 Java 和 .Net 编程环境中非常常用的设计模式。这种模式用于顺序访问集合对象的元素，不需要知道集合对象的底层表示。</p>
<p>迭代器模式属于行为型模式。</p>
<h4 id="介绍-15" tabindex="-1"><a class="header-anchor" href="#介绍-15" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**提供一种方法顺序访问一个聚合对象中各个元素, 而又无须暴露该对象的内部表示。</p>
<p>**主要解决：**不同的方式来遍历整个整合对象。</p>
<p>**何时使用：**遍历一个聚合对象。</p>
<p>**如何解决：**把在元素之间游走的责任交给迭代器，而不是聚合对象。</p>
<p>**关键代码：**定义接口：hasNext, next。</p>
<p>**应用实例：**JAVA 中的 iterator。</p>
<p><strong>优点：</strong> 1、它支持以不同的方式遍历一个聚合对象。 2、迭代器简化了聚合类。 3、在同一个聚合上可以有多个遍历。 4、在迭代器模式中，增加新的聚合类和迭代器类都很方便，无须修改原有代码。</p>
<p>**缺点：**由于迭代器模式将存储数据和遍历数据的职责分离，增加新的聚合类需要对应增加新的迭代器类，类的个数成对增加，这在一定程度上增加了系统的复杂性。</p>
<p><strong>使用场景：</strong> 1、访问一个聚合对象的内容而无须暴露它的内部表示。 2、需要为聚合对象提供多种遍历方式。 3、为遍历不同的聚合结构提供一个统一的接口。</p>
<blockquote>
<p>注意事项：迭代器模式就是分离了集合对象的遍历行为，抽象出一个迭代器类来负责，这样既可以做到不暴露集合的内部结构，又可让外部代码透明地访问集合内部的数据。</p>
</blockquote>
<h4 id="实现-16" tabindex="-1"><a class="header-anchor" href="#实现-16" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个叙述导航方法的 Iterator 接口和一个返回迭代器的 Container 接口。实现了 Container 接口的实体类将负责实现 Iterator 接口。</p>
<p>IteratorPatternDemo，我们的演示类使用实体类 NamesRepository 来打印 NamesRepository 中存储为集合的 Names。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Iterator.jpg" alt="Iterator"></p>
<p><strong>步骤 1</strong></p>
<p>创建接口:</p>
<p>Iterator.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Iterator</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>Container.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Container</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">getIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现了 Container 接口的实体类。该类有实现了 Iterator 接口的内部类 NameIterator。</p>
<p>NameRepository.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NameRepository</span> <span class="token keyword">implements</span> <span class="token class-name">Container</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> names <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"Robert"</span> <span class="token punctuation">,</span> <span class="token string">"John"</span> <span class="token punctuation">,</span><span class="token string">"Julie"</span> <span class="token punctuation">,</span> <span class="token string">"Lora"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">Iterator</span> <span class="token function">getIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NameIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">private</span> <span class="token keyword">class</span> <span class="token class-name">NameIterator</span> <span class="token keyword">implements</span> <span class="token class-name">Iterator</span> <span class="token punctuation">{</span>
 
      <span class="token keyword">int</span> index<span class="token punctuation">;</span>
 
      <span class="token annotation punctuation">@Override</span>
      <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span>index <span class="token operator">&lt;</span> names<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
 
      <span class="token annotation punctuation">@Override</span>
      <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> names<span class="token punctuation">[</span>index<span class="token operator">++</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
         <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>     
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>步骤 3</strong></p>
<p>使用 NameRepository 来获取迭代器，并打印名字。</p>
<p>IteratorPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IteratorPatternDemo</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">NameRepository</span> namesRepository <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NameRepository</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token class-name">Iterator</span> iter <span class="token operator">=</span> namesRepository<span class="token punctuation">.</span><span class="token function">getIterator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> iter<span class="token punctuation">.</span><span class="token function">hasNext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
         <span class="token class-name">String</span> name <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">)</span>iter<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Name : "</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>  
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Name <span class="token builtin class-name">:</span> Robert
Name <span class="token builtin class-name">:</span> John
Name <span class="token builtin class-name">:</span> Julie
Name <span class="token builtin class-name">:</span> Lora
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="中介者模式" tabindex="-1"><a class="header-anchor" href="#中介者模式" aria-hidden="true">#</a> 中介者模式</h3>
<p>中介者模式（Mediator Pattern）是用来降低多个对象和类之间的通信复杂性。这种模式提供了一个中介类，该类通常处理不同类之间的通信，并支持松耦合，使代码易于维护。中介者模式属于行为型模式。</p>
<h4 id="介绍-16" tabindex="-1"><a class="header-anchor" href="#介绍-16" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**用一个中介对象来封装一系列的对象交互，中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。</p>
<p>**主要解决：**对象与对象之间存在大量的关联关系，这样势必会导致系统的结构变得很复杂，同时若一个对象发生改变，我们也需要跟踪与之相关联的对象，同时做出相应的处理。</p>
<p>**何时使用：**多个类相互耦合，形成了网状结构。</p>
<p>**如何解决：**将上述网状结构分离为星型结构。</p>
<p>**关键代码：**对象 Colleague 之间的通信封装到一个类中单独处理。</p>
<p><strong>应用实例：</strong> 1、中国加入 WTO 之前是各个国家相互贸易，结构复杂，现在是各个国家通过 WTO 来互相贸易。 2、机场调度系统。 3、MVC 框架，其中C（控制器）就是 M（模型）和 V（视图）的中介者。</p>
<p><strong>优点：</strong> 1、降低了类的复杂度，将一对多转化成了一对一。 2、各个类之间的解耦。 3、符合迪米特原则。</p>
<p>**缺点：**中介者会庞大，变得复杂难以维护。</p>
<p><strong>使用场景：</strong> 1、系统中对象之间存在比较复杂的引用关系，导致它们之间的依赖关系结构混乱而且难以复用该对象。 2、想通过一个中间类来封装多个类中的行为，而又不想生成太多的子类。</p>
<blockquote>
<p>注意事项：不应当在职责混乱的时候使用。</p>
</blockquote>
<h4 id="实现-17" tabindex="-1"><a class="header-anchor" href="#实现-17" aria-hidden="true">#</a> 实现</h4>
<p>我们通过聊天室实例来演示中介者模式。实例中，多个用户可以向聊天室发送消息，聊天室向所有的用户显示消息。我们将创建两个类 ChatRoom 和 User。User 对象使用 ChatRoom 方法来分享他们的消息。</p>
<p>MediatorPatternDemo，我们的演示类使用 User 对象来显示他们之间的通信。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Mediator.jpg" alt="Mediator"></p>
<p><strong>步骤 1</strong></p>
<p>创建中介类。</p>
<p>ChatRoom.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Date</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ChatRoom</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">showMessage</span><span class="token punctuation">(</span><span class="token class-name">User</span> user<span class="token punctuation">,</span> <span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
         <span class="token operator">+</span> <span class="token string">" ["</span> <span class="token operator">+</span> user<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span><span class="token string">"] : "</span> <span class="token operator">+</span> message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建 user 类。</p>
<p>User.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setName</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>name  <span class="token operator">=</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token class-name">String</span> message<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token class-name">ChatRoom</span><span class="token punctuation">.</span><span class="token function">showMessage</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>步骤 3</strong></p>
<p>使用 User 对象来显示他们之间的通信。</p>
<p>MediatorPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MediatorPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">User</span> robert <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"Robert"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">User</span> john <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">"John"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      robert<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">"Hi! John!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      john<span class="token punctuation">.</span><span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">"Hello! Robert!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
Thu Jan <span class="token number">31</span> <span class="token number">16</span>:05:46 IST <span class="token number">2013</span> <span class="token punctuation">[</span>Robert<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> Hi<span class="token operator">!</span> John<span class="token operator">!</span>
Thu Jan <span class="token number">31</span> <span class="token number">16</span>:05:46 IST <span class="token number">2013</span> <span class="token punctuation">[</span>John<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> Hello<span class="token operator">!</span> Robert<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="备忘录模式" tabindex="-1"><a class="header-anchor" href="#备忘录模式" aria-hidden="true">#</a> 备忘录模式</h3>
<p>备忘录模式（Memento Pattern）保存一个对象的某个状态，以便在适当的时候恢复对象。备忘录模式属于行为型模式。</p>
<h4 id="介绍-17" tabindex="-1"><a class="header-anchor" href="#介绍-17" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。</p>
<p>**主要解决：**所谓备忘录模式就是在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。</p>
<p>**何时使用：**很多时候我们总是需要记录一个对象的内部状态，这样做的目的就是为了允许用户取消不确定或者错误的操作，能够恢复到他原先的状态，使得他有&quot;后悔药&quot;可吃。</p>
<p>**如何解决：**通过一个备忘录类专门存储对象状态。</p>
<p>**关键代码：**客户不与备忘录类耦合，与备忘录管理类耦合。</p>
<p><strong>应用实例：</strong> 1、后悔药。 2、打游戏时的存档。 3、Windows 里的 ctrl + z。 4、IE 中的后退。 5、数据库的事务管理。</p>
<p><strong>优点：</strong> 1、给用户提供了一种可以恢复状态的机制，可以使用户能够比较方便地回到某个历史的状态。 2、实现了信息的封装，使得用户不需要关心状态的保存细节。</p>
<p>**缺点：**消耗资源。如果类的成员变量过多，势必会占用比较大的资源，而且每一次保存都会消耗一定的内存。</p>
<p><strong>使用场景：</strong> 1、需要保存/恢复数据的相关状态场景。 2、提供一个可回滚的操作。</p>
<blockquote>
<p>注意事项： 1、为了符合迪米特原则，还要增加一个管理备忘录的类。 2、为了节约内存，可使用原型模式+备忘录模式。</p>
</blockquote>
<h4 id="实现-18" tabindex="-1"><a class="header-anchor" href="#实现-18" aria-hidden="true">#</a> 实现</h4>
<p>备忘录模式使用三个类 Memento、Originator 和 CareTaker。Memento 包含了要被恢复的对象的状态。Originator 创建并在 Memento 对象中存储状态。Caretaker 对象负责从 Memento 中恢复对象的状态。</p>
<p>MementoPatternDemo，我们的演示类使用 CareTaker 和 Originator 对象来显示对象的状态恢复。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Memento.jpg" alt="Memento"></p>
<p><strong>步骤 1</strong></p>
<p>创建 Memento 类。</p>
<p>Memento.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Memento</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> state<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Memento</span><span class="token punctuation">(</span><span class="token class-name">String</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建 Originator 类。</p>
<p>Originator.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Originator</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">String</span> state<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token class-name">String</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Memento</span> <span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Memento</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getStateFromMemento</span><span class="token punctuation">(</span><span class="token class-name">Memento</span> <span class="token class-name">Memento</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      state <span class="token operator">=</span> <span class="token class-name">Memento</span><span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建 CareTaker 类。</p>
<p>CareTaker.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CareTaker</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Memento</span><span class="token punctuation">></span></span> mementoList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Memento</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">Memento</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
      mementoList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Memento</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> mementoList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用 CareTaker 和 Originator 对象。</p>
<p>MementoPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MementoPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Originator</span> originator <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Originator</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">CareTaker</span> careTaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CareTaker</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      originator<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"State #1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      originator<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"State #2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      careTaker<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>originator<span class="token punctuation">.</span><span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      originator<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"State #3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      careTaker<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>originator<span class="token punctuation">.</span><span class="token function">saveStateToMemento</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      originator<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token string">"State #4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Current State: "</span> <span class="token operator">+</span> originator<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
      originator<span class="token punctuation">.</span><span class="token function">getStateFromMemento</span><span class="token punctuation">(</span>careTaker<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"First saved State: "</span> <span class="token operator">+</span> originator<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      originator<span class="token punctuation">.</span><span class="token function">getStateFromMemento</span><span class="token punctuation">(</span>careTaker<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Second saved State: "</span> <span class="token operator">+</span> originator<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>步骤 5</strong></p>
<p>验证输出。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Current State: State <span class="token comment">#4</span>
First saved State: State <span class="token comment">#2</span>
Second saved State: State <span class="token comment">#3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="观察者模式" tabindex="-1"><a class="header-anchor" href="#观察者模式" aria-hidden="true">#</a> 观察者模式</h3>
<p>当对象间存在一对多关系时，则使用观察者模式（Observer Pattern）。比如，当一个对象被修改时，则会自动通知依赖它的对象。观察者模式属于行为型模式。</p>
<h4 id="介绍-18" tabindex="-1"><a class="header-anchor" href="#介绍-18" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。</p>
<p>**主要解决：**一个对象状态改变给其他对象通知的问题，而且要考虑到易用和低耦合，保证高度的协作。</p>
<p>**何时使用：**一个对象（目标对象）的状态发生改变，所有的依赖对象（观察者对象）都将得到通知，进行广播通知。</p>
<p>**如何解决：**使用面向对象技术，可以将这种依赖关系弱化。</p>
<p>**关键代码：**在抽象类里有一个 ArrayList 存放观察者们。</p>
<p><strong>应用实例：</strong> 1、拍卖的时候，拍卖师观察最高标价，然后通知给其他竞价者竞价。 2、西游记里面悟空请求菩萨降服红孩儿，菩萨洒了一地水招来一个老乌龟，这个乌龟就是观察者，他观察菩萨洒水这个动作。</p>
<p><strong>优点：</strong> 1、观察者和被观察者是抽象耦合的。 2、建立一套触发机制。</p>
<p><strong>缺点：</strong> 1、如果一个被观察者对象有很多的直接和间接的观察者的话，将所有的观察者都通知到会花费很多时间。 2、如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。 3、观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。</p>
<p><strong>使用场景：</strong></p>
<ul>
<li>一个抽象模型有两个方面，其中一个方面依赖于另一个方面。将这些方面封装在独立的对象中使它们可以各自独立地改变和复用。</li>
<li>一个对象的改变将导致其他一个或多个对象也发生改变，而不知道具体有多少对象将发生改变，可以降低对象之间的耦合度。</li>
<li>一个对象必须通知其他对象，而并不知道这些对象是谁。
需要在系统中创建一个触发链，A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制。</li>
</ul>
<blockquote>
<p>注意事项： 1、JAVA 中已经有了对观察者模式的支持类。 2、避免循环引用。 3、如果顺序执行，某一观察者错误会导致系统卡壳，一般采用异步方式。</p>
</blockquote>
<h4 id="实现-19" tabindex="-1"><a class="header-anchor" href="#实现-19" aria-hidden="true">#</a> 实现</h4>
<p>观察者模式使用三个类 Subject、Observer 和 Client。Subject 对象带有绑定观察者到 Client 对象和从 Client 对象解绑观察者的方法。我们创建 Subject 类、Observer 抽象类和扩展了抽象类 Observer 的实体类。</p>
<p>ObserverPatternDemo，我们的演示类使用 Subject 和实体类对象来演示观察者模式。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Observer.jpg" alt="Observer"></p>
<p><strong>步骤 1</strong></p>
<p>创建 Subject 类。</p>
<p>Subject.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
 
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Subject</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span> observers 
      <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Observer</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">private</span> <span class="token keyword">int</span> state<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">int</span> state<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>
      <span class="token function">notifyAllObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">attach</span><span class="token punctuation">(</span><span class="token class-name">Observer</span> observer<span class="token punctuation">)</span><span class="token punctuation">{</span>
      observers<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>observer<span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">notifyAllObservers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Observer</span> observer <span class="token operator">:</span> observers<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         observer<span class="token punctuation">.</span><span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建 Observer 类。</p>
<p>Observer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Observer</span> <span class="token punctuation">{</span>
   <span class="token keyword">protected</span> <span class="token class-name">Subject</span> subject<span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建实体观察者类。</p>
<p>BinaryObserver.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">BinaryObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">BinaryObserver</span><span class="token punctuation">(</span><span class="token class-name">Subject</span> subject<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject <span class="token operator">=</span> subject<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span> <span class="token string">"Binary String: "</span> 
      <span class="token operator">+</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toBinaryString</span><span class="token punctuation">(</span> subject<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>OctalObserver.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OctalObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">OctalObserver</span><span class="token punctuation">(</span><span class="token class-name">Subject</span> subject<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject <span class="token operator">=</span> subject<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span> <span class="token string">"Octal String: "</span> 
     <span class="token operator">+</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toOctalString</span><span class="token punctuation">(</span> subject<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>HexaObserver.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">HexaObserver</span> <span class="token keyword">extends</span> <span class="token class-name">Observer</span><span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">HexaObserver</span><span class="token punctuation">(</span><span class="token class-name">Subject</span> subject<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject <span class="token operator">=</span> subject<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>subject<span class="token punctuation">.</span><span class="token function">attach</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span> <span class="token string">"Hex String: "</span> 
      <span class="token operator">+</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">toHexString</span><span class="token punctuation">(</span> subject<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用 Subject 和实体观察者对象。</p>
<p>ObserverPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ObserverPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Subject</span> subject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Subject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token keyword">new</span> <span class="token class-name">HexaObserver</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">OctalObserver</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">new</span> <span class="token class-name">BinaryObserver</span><span class="token punctuation">(</span>subject<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"First state change: 15"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   
      subject<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">15</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Second state change: 10"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
      subject<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>First state change: <span class="token number">15</span>
Hex String: F
Octal String: <span class="token number">17</span>
Binary String: <span class="token number">1111</span>
Second state change: <span class="token number">10</span>
Hex String: A
Octal String: <span class="token number">12</span>
Binary String: <span class="token number">1010</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="状态模式" tabindex="-1"><a class="header-anchor" href="#状态模式" aria-hidden="true">#</a> 状态模式</h3>
<p>在状态模式（State Pattern）中，类的行为是基于它的状态改变的。这种类型的设计模式属于行为型模式。</p>
<p>在状态模式中，我们创建表示各种状态的对象和一个行为随着状态对象改变而改变的 context 对象。</p>
<h4 id="介绍-19" tabindex="-1"><a class="header-anchor" href="#介绍-19" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**允许对象在内部状态发生改变时改变它的行为，对象看起来好像修改了它的类。</p>
<p>**主要解决：**对象的行为依赖于它的状态（属性），并且可以根据它的状态改变而改变它的相关行为。</p>
<p>**何时使用：**代码中包含大量与对象状态有关的条件语句。</p>
<p>**如何解决：**将各种具体的状态类抽象出来。</p>
<p>**关键代码：**通常命令模式的接口中只有一个方法。而状态模式的接口中有一个或者多个方法。而且，状态模式的实现类的方法，一般返回值，或者是改变实例变量的值。也就是说，状态模式一般和对象的状态有关。实现类的方法有不同的功能，覆盖接口中的方法。状态模式和命令模式一样，也可以用于消除 if...else 等条件选择语句。</p>
<p><strong>应用实例：</strong> 1、打篮球的时候运动员可以有正常状态、不正常状态和超常状态。 2、曾侯乙编钟中，'钟是抽象接口','钟A'等是具体状态，'曾侯乙编钟'是具体环境（Context）。</p>
<p><strong>优点：</strong> 1、封装了转换规则。 2、枚举可能的状态，在枚举状态之前需要确定状态种类。 3、将所有与某个状态有关的行为放到一个类中，并且可以方便地增加新的状态，只需要改变对象状态即可改变对象的行为。 4、允许状态转换逻辑与状态对象合成一体，而不是某一个巨大的条件语句块。 5、可以让多个环境对象共享一个状态对象，从而减少系统中对象的个数。</p>
<p><strong>缺点：</strong> 1、状态模式的使用必然会增加系统类和对象的个数。 2、状态模式的结构与实现都较为复杂，如果使用不当将导致程序结构和代码的混乱。 3、状态模式对&quot;开闭原则&quot;的支持并不太好，对于可以切换状态的状态模式，增加新的状态类需要修改那些负责状态转换的源代码，否则无法切换到新增状态，而且修改某个状态类的行为也需修改对应类的源代码。</p>
<p><strong>使用场景：</strong> 1、行为随状态改变而改变的场景。 2、条件、分支语句的代替者。</p>
<blockquote>
<p>注意事项：在行为受状态约束的时候使用状态模式，而且状态不超过 5 个。</p>
</blockquote>
<h4 id="实现-20" tabindex="-1"><a class="header-anchor" href="#实现-20" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个 State 接口和实现了 State 接口的实体状态类。Context 是一个带有某个状态的类。</p>
<p>StatePatternDemo，我们的演示类使用 Context 和状态对象来演示 Context 在状态改变时的行为变化。</p>
<p><img src="@source/Back/imgs/Design-Pattern/State.jpg" alt="State"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口。</p>
<p>State.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAction</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>StartState.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StartState</span> <span class="token keyword">implements</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAction</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Player is in start state"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Start State"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>StopState.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StopState</span> <span class="token keyword">implements</span> <span class="token class-name">State</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">doAction</span><span class="token punctuation">(</span><span class="token class-name">Context</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Player is in stop state"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      context<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Stop State"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建 Context 类。</p>
<p>Context.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">State</span> state<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      state <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setState</span><span class="token punctuation">(</span><span class="token class-name">State</span> state<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>state <span class="token operator">=</span> state<span class="token punctuation">;</span>     
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token class-name">State</span> <span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> state<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用 Context 来查看当状态 State 改变时的行为变化。</p>
<p>StatePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StatePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Context</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">StartState</span> startState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StartState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      startState<span class="token punctuation">.</span><span class="token function">doAction</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">StopState</span> stopState <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StopState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      stopState<span class="token punctuation">.</span><span class="token function">doAction</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Player is <span class="token keyword">in</span> start state
Start State
Player is <span class="token keyword">in</span> stop state
Stop State
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="空对象模式" tabindex="-1"><a class="header-anchor" href="#空对象模式" aria-hidden="true">#</a> 空对象模式</h3>
<p>在空对象模式（Null Object Pattern）中，一个空对象取代 NULL 对象实例的检查。Null 对象不是检查空值，而是反应一个不做任何动作的关系。这样的 Null 对象也可以在数据不可用的时候提供默认的行为。</p>
<p>在空对象模式中，我们创建一个指定各种要执行的操作的抽象类和扩展该类的实体类，还创建一个未对该类做任何实现的空对象类，该空对象类将无缝地使用在需要检查空值的地方。</p>
<h4 id="实现-21" tabindex="-1"><a class="header-anchor" href="#实现-21" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个定义操作（在这里，是客户的名称）的 AbstractCustomer 抽象类，和扩展了 AbstractCustomer 类的实体类。工厂类 CustomerFactory 基于客户传递的名字来返回 RealCustomer 或 NullCustomer 对象。</p>
<p>NullPatternDemo，我们的演示类使用 CustomerFactory 来演示空对象模式的用法。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Null.jpg" alt="Null"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个抽象类。</p>
<p>AbstractCustomer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractCustomer</span> <span class="token punctuation">{</span>
   <span class="token keyword">protected</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">boolean</span> <span class="token function">isNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建扩展了上述类的实体类。</p>
<p>RealCustomer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RealCustomer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractCustomer</span> <span class="token punctuation">{</span>
 
   <span class="token keyword">public</span> <span class="token class-name">RealCustomer</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>    
   <span class="token punctuation">}</span>
   
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> name<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
   
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>NullCustomer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NullCustomer</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractCustomer</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token string">"Not Available in Customer Database"</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isNil</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建 CustomerFactory 类。</p>
<p>CustomerFactory.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CustomerFactory</span> <span class="token punctuation">{</span>
   
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> names <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">"Rob"</span><span class="token punctuation">,</span> <span class="token string">"Joe"</span><span class="token punctuation">,</span> <span class="token string">"Julie"</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">AbstractCustomer</span> <span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> names<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span> <span class="token punctuation">(</span>names<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">RealCustomer</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NullCustomer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用 CustomerFactory，基于客户传递的名字，来获取 RealCustomer 或 NullCustomer 对象。</p>
<p>NullPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NullPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token class-name">AbstractCustomer</span> customer1 <span class="token operator">=</span> <span class="token class-name">CustomerFactory</span><span class="token punctuation">.</span><span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token string">"Rob"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">AbstractCustomer</span> customer2 <span class="token operator">=</span> <span class="token class-name">CustomerFactory</span><span class="token punctuation">.</span><span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token string">"Bob"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">AbstractCustomer</span> customer3 <span class="token operator">=</span> <span class="token class-name">CustomerFactory</span><span class="token punctuation">.</span><span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token string">"Julie"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">AbstractCustomer</span> customer4 <span class="token operator">=</span> <span class="token class-name">CustomerFactory</span><span class="token punctuation">.</span><span class="token function">getCustomer</span><span class="token punctuation">(</span><span class="token string">"Laura"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Customers"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>customer1<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>customer2<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>customer3<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>customer4<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Customers
Rob
Not Available <span class="token keyword">in</span> Customer Database
Julie
Not Available <span class="token keyword">in</span> Customer Database
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="策略模式" tabindex="-1"><a class="header-anchor" href="#策略模式" aria-hidden="true">#</a> 策略模式</h3>
<p>在策略模式（Strategy Pattern）中，一个类的行为或其算法可以在运行时更改。这种类型的设计模式属于行为型模式。</p>
<p>在策略模式中，我们创建表示各种策略的对象和一个行为随着策略对象改变而改变的 context 对象。策略对象改变 context 对象的执行算法。</p>
<h4 id="介绍-20" tabindex="-1"><a class="header-anchor" href="#介绍-20" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**定义一系列的算法,把它们一个个封装起来, 并且使它们可相互替换。</p>
<p>**主要解决：**在有多种算法相似的情况下，使用 if...else 所带来的复杂和难以维护。</p>
<p>**何时使用：**一个系统有许多许多类，而区分它们的只是他们直接的行为。</p>
<p>**如何解决：**将这些算法封装成一个一个的类，任意地替换。</p>
<p>**关键代码：**实现同一个接口。</p>
<p><strong>应用实例：</strong> 1、诸葛亮的锦囊妙计，每一个锦囊就是一个策略。 2、旅行的出游方式，选择骑自行车、坐汽车，每一种旅行方式都是一个策略。 3、JAVA AWT 中的 LayoutManager。</p>
<p><strong>优点：</strong> 1、算法可以自由切换。 2、避免使用多重条件判断。 3、扩展性良好。</p>
<p><strong>缺点：</strong> 1、策略类会增多。 2、所有策略类都需要对外暴露。</p>
<p><strong>使用场景：</strong> 1、如果在一个系统里面有许多类，它们之间的区别仅在于它们的行为，那么使用策略模式可以动态地让一个对象在许多行为中选择一种行为。 2、一个系统需要动态地在几种算法中选择一种。 3、如果一个对象有很多的行为，如果不用恰当的模式，这些行为就只好使用多重的条件选择语句来实现。</p>
<blockquote>
<p>注意事项：如果一个系统的策略多于四个，就需要考虑使用混合模式，解决策略类膨胀的问题。</p>
</blockquote>
<h4 id="实现-22" tabindex="-1"><a class="header-anchor" href="#实现-22" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个定义活动的 Strategy 接口和实现了 Strategy 接口的实体策略类。Context 是一个使用了某种策略的类。</p>
<p>StrategyPatternDemo，我们的演示类使用 Context 和策略对象来演示 Context 在它所配置或使用的策略改变时的行为变化。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Strategy.jpg" alt="Strategy"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个接口。</p>
<p>Strategy.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Strategy</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建实现接口的实体类。</p>
<p>OperationAdd.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperationAdd</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span><span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> num1 <span class="token operator">+</span> num2<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>OperationSubtract.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperationSubtract</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span><span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> num1 <span class="token operator">-</span> num2<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>OperationMultiply.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OperationMultiply</span> <span class="token keyword">implements</span> <span class="token class-name">Strategy</span><span class="token punctuation">{</span>
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">doOperation</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> num1 <span class="token operator">*</span> num2<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>步骤 3</strong></p>
<p>创建 Context 类。</p>
<p>Context.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Context</span> <span class="token punctuation">{</span>
   <span class="token keyword">private</span> <span class="token class-name">Strategy</span> strategy<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token class-name">Strategy</span> strategy<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>strategy <span class="token operator">=</span> strategy<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token keyword">int</span> num1<span class="token punctuation">,</span> <span class="token keyword">int</span> num2<span class="token punctuation">)</span><span class="token punctuation">{</span>
      <span class="token keyword">return</span> strategy<span class="token punctuation">.</span><span class="token function">doOperation</span><span class="token punctuation">(</span>num1<span class="token punctuation">,</span> num2<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>步骤 4</strong></p>
<p>使用 Context 来查看当它改变策略 Strategy 时的行为变化。</p>
<p>StrategyPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">StrategyPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Context</span> context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OperationAdd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"10 + 5 = "</span> <span class="token operator">+</span> context<span class="token punctuation">.</span><span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OperationSubtract</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"10 - 5 = "</span> <span class="token operator">+</span> context<span class="token punctuation">.</span><span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      context <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Context</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">OperationMultiply</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"10 * 5 = "</span> <span class="token operator">+</span> context<span class="token punctuation">.</span><span class="token function">executeStrategy</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>步骤 5</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">10</span> + <span class="token number">5</span> <span class="token operator">=</span> <span class="token number">15</span>
<span class="token number">10</span> - <span class="token number">5</span> <span class="token operator">=</span> <span class="token number">5</span>
<span class="token number">10</span> * <span class="token number">5</span> <span class="token operator">=</span> <span class="token number">50</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="模板模式" tabindex="-1"><a class="header-anchor" href="#模板模式" aria-hidden="true">#</a> 模板模式</h3>
<p>在模板模式（Template Pattern）中，一个抽象类公开定义了执行它的方法的方式/模板。它的子类可以按需要重写方法实现，但调用将以抽象类中定义的方式进行。这种类型的设计模式属于行为型模式。</p>
<h4 id="介绍-21" tabindex="-1"><a class="header-anchor" href="#介绍-21" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**定义一个操作中的算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。</p>
<p>**主要解决：**一些方法通用，却在每一个子类都重新写了这一方法。</p>
<p>**何时使用：**有一些通用的方法。</p>
<p>**如何解决：**将这些通用算法抽象出来。</p>
<p>**关键代码：**在抽象类实现，其他步骤在子类实现。</p>
<p><strong>应用实例：</strong> 1、在造房子的时候，地基、走线、水管都一样，只有在建筑的后期才有加壁橱加栅栏等差异。 2、西游记里面菩萨定好的 81 难，这就是一个顶层的逻辑骨架。 3、spring 中对 Hibernate 的支持，将一些已经定好的方法封装起来，比如开启事务、获取 Session、关闭 Session 等，程序员不重复写那些已经规范好的代码，直接丢一个实体就可以保存。</p>
<p><strong>优点：</strong> 1、封装不变部分，扩展可变部分。 2、提取公共代码，便于维护。 3、行为由父类控制，子类实现。</p>
<p>**缺点：**每一个不同的实现都需要一个子类来实现，导致类的个数增加，使得系统更加庞大。</p>
<p><strong>使用场景：</strong> 1、有多个子类共有的方法，且逻辑相同。 2、重要的、复杂的方法，可以考虑作为模板方法。</p>
<blockquote>
<p>注意事项：为防止恶意操作，一般模板方法都加上 final 关键词。</p>
</blockquote>
<h4 id="实现-23" tabindex="-1"><a class="header-anchor" href="#实现-23" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个定义操作的 Game 抽象类，其中，模板方法设置为 final，这样它就不会被重写。Cricket 和 Football 是扩展了 Game 的实体类，它们重写了抽象类的方法。</p>
<p>TemplatePatternDemo，我们的演示类使用 Game 来演示模板模式的用法。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Template.jpg" alt="Template"></p>
<p><strong>步骤 1</strong></p>
<p>创建一个抽象类，它的模板方法被设置为 final。</p>
<p>Game.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span>
   <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">startPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">endPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
   <span class="token comment">//模板</span>
   <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 
      <span class="token comment">//初始化游戏</span>
      <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//开始游戏</span>
      <span class="token function">startPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
      <span class="token comment">//结束游戏</span>
      <span class="token function">endPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建扩展了上述类的实体类。</p>
<p>Cricket.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Cricket</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">endPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Cricket Game Finished!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Cricket Game Initialized! Start playing."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">startPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Cricket Game Started. Enjoy the game!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>Football.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Football</span> <span class="token keyword">extends</span> <span class="token class-name">Game</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">endPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Football Game Finished!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">initialize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Football Game Initialized! Start playing."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">void</span> <span class="token function">startPlay</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Football Game Started. Enjoy the game!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 3</strong></p>
<p>使用 Game 的模板方法 play() 来演示游戏的定义方式。</p>
<p>TemplatePatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TemplatePatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token class-name">Game</span> game <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Cricket</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      game<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      game <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Football</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      game<span class="token punctuation">.</span><span class="token function">play</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p><strong>步骤 4</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Cricket Game Initialized<span class="token operator">!</span> Start playing.
Cricket Game Started. Enjoy the game<span class="token operator">!</span>
Cricket Game Finished<span class="token operator">!</span>

Football Game Initialized<span class="token operator">!</span> Start playing.
Football Game Started. Enjoy the game<span class="token operator">!</span>
Football Game Finished<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="访问者模式" tabindex="-1"><a class="header-anchor" href="#访问者模式" aria-hidden="true">#</a> 访问者模式</h3>
<p>在访问者模式（Visitor Pattern）中，我们使用了一个访问者类，它改变了元素类的执行算法。通过这种方式，元素的执行算法可以随着访问者改变而改变。这种类型的设计模式属于行为型模式。根据模式，元素对象已接受访问者对象，这样访问者对象就可以处理元素对象上的操作。</p>
<h4 id="介绍-22" tabindex="-1"><a class="header-anchor" href="#介绍-22" aria-hidden="true">#</a> 介绍</h4>
<p>**意图：**主要将数据结构与数据操作分离。</p>
<p>**主要解决：**稳定的数据结构和易变的操作耦合问题。</p>
<p>**何时使用：**需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作&quot;污染&quot;这些对象的类，使用访问者模式将这些封装到类中。</p>
<p>**如何解决：**在被访问的类里面加一个对外提供接待访问者的接口。</p>
<p>**关键代码：**在数据基础类里面有一个方法接受访问者，将自身引用传入访问者。</p>
<p>**应用实例：**您在朋友家做客，您是访问者，朋友接受您的访问，您通过朋友的描述，然后对朋友的描述做出一个判断，这就是访问者模式。</p>
<p><strong>优点：</strong> 1、符合单一职责原则。 2、优秀的扩展性。 3、灵活性。</p>
<p><strong>缺点：</strong> 1、具体元素对访问者公布细节，违反了迪米特原则。 2、具体元素变更比较困难。 3、违反了依赖倒置原则，依赖了具体类，没有依赖抽象。</p>
<p><strong>使用场景：</strong> 1、对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作。 2、需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作&quot;污染&quot;这些对象的类，也不希望在增加新操作时修改这些类。</p>
<blockquote>
<p>注意事项：访问者可以对功能进行统一，可以做报表、UI、拦截器与过滤器。</p>
</blockquote>
<h4 id="实现-24" tabindex="-1"><a class="header-anchor" href="#实现-24" aria-hidden="true">#</a> 实现</h4>
<p>我们将创建一个定义接受操作的 ComputerPart 接口。Keyboard、Mouse、Monitor 和 Computer 是实现了 ComputerPart 接口的实体类。我们将定义另一个接口 ComputerPartVisitor，它定义了访问者类的操作。Computer 使用实体访问者来执行相应的动作。</p>
<p>VisitorPatternDemo，我们的演示类使用 Computer、ComputerPartVisitor 类来演示访问者模式的用法。</p>
<p><img src="@source/Back/imgs/Design-Pattern/Visitor.jpg" alt="Visitor"></p>
<p><strong>步骤 1</strong></p>
<p>定义一个表示元素的接口。</p>
<p>ComputerPart.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ComputerPart</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">ComputerPartVisitor</span> computerPartVisitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>步骤 2</strong></p>
<p>创建扩展了上述类的实体类。</p>
<p>Keyboard.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Keyboard</span>  <span class="token keyword">implements</span> <span class="token class-name">ComputerPart</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">ComputerPartVisitor</span> computerPartVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      computerPartVisitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Monitor.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Monitor</span>  <span class="token keyword">implements</span> <span class="token class-name">ComputerPart</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">ComputerPartVisitor</span> computerPartVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      computerPartVisitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Mouse.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Mouse</span>  <span class="token keyword">implements</span> <span class="token class-name">ComputerPart</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">ComputerPartVisitor</span> computerPartVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      computerPartVisitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>Computer.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Computer</span> <span class="token keyword">implements</span> <span class="token class-name">ComputerPart</span> <span class="token punctuation">{</span>
   
   <span class="token class-name">ComputerPart</span><span class="token punctuation">[</span><span class="token punctuation">]</span> parts<span class="token punctuation">;</span>
 
   <span class="token keyword">public</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      parts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ComputerPart</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Mouse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Keyboard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Monitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">;</span>      
   <span class="token punctuation">}</span> 
 
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">accept</span><span class="token punctuation">(</span><span class="token class-name">ComputerPartVisitor</span> computerPartVisitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> parts<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         parts<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span>computerPartVisitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
      computerPartVisitor<span class="token punctuation">.</span><span class="token function">visit</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p><strong>步骤 3</strong></p>
<p>定义一个表示访问者的接口。</p>
<p>ComputerPartVisitor.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ComputerPartVisitor</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Computer</span> computer<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Mouse</span> mouse<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Keyboard</span> keyboard<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Monitor</span> monitor<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p><strong>步骤 4</strong></p>
<p>创建实现了上述类的实体访问者。</p>
<p>ComputerPartDisplayVisitor.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ComputerPartDisplayVisitor</span> <span class="token keyword">implements</span> <span class="token class-name">ComputerPartVisitor</span> <span class="token punctuation">{</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Computer</span> computer<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Displaying Computer."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Mouse</span> mouse<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Displaying Mouse."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Keyboard</span> keyboard<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Displaying Keyboard."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
 
   <span class="token annotation punctuation">@Override</span>
   <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">visit</span><span class="token punctuation">(</span><span class="token class-name">Monitor</span> monitor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Displaying Monitor."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p><strong>步骤 5</strong></p>
<p>使用 ComputerPartDisplayVisitor 来显示 Computer 的组成部分。</p>
<p>VisitorPatternDemo.java</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">VisitorPatternDemo</span> <span class="token punctuation">{</span>
   <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
      <span class="token class-name">ComputerPart</span> computer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Computer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      computer<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ComputerPartDisplayVisitor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>步骤 6</strong></p>
<p>执行程序，输出结果：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Displaying Mouse.
Displaying Keyboard.
Displaying Monitor.
Displaying Computer.
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></template>

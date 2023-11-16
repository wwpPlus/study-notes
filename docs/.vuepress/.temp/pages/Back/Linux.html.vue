<template><h1 id="linux" tabindex="-1"><a class="header-anchor" href="#linux" aria-hidden="true">#</a> Linux</h1>
<h2 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h2>
<h3 id="linux关机-重启" tabindex="-1"><a class="header-anchor" href="#linux关机-重启" aria-hidden="true">#</a> Linux关机,重启</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 关机</span>
<span class="token function">shutdown</span> <span class="token parameter variable">-h</span> now

<span class="token comment"># 重启</span>
<span class="token function">shutdown</span> <span class="token parameter variable">-r</span> now
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="查看系统-cpu信息" tabindex="-1"><a class="header-anchor" href="#查看系统-cpu信息" aria-hidden="true">#</a> 查看系统,CPU信息</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看系统内核信息</span>
<span class="token function">uname</span> <span class="token parameter variable">-a</span>

<span class="token comment"># 查看系统内核版本</span>
<span class="token function">cat</span> /proc/version

<span class="token comment"># 查看当前用户环境变量</span>
<span class="token function">env</span>

<span class="token function">cat</span> /proc/cpuinfo

<span class="token comment"># 查看有几个逻辑cpu, 包括cpu型号</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> name <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f2</span> -d: <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>

<span class="token comment"># 查看有几颗cpu,每颗分别是几核</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> physical <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span>

<span class="token comment"># 查看当前CPU运行在32bit还是64bit模式下, 如果是运行在32bit下也不代表CPU不支持64bit</span>
getconf LONG_BIT

<span class="token comment"># 结果大于0, 说明支持64bit计算. lm指long mode, 支持lm则是64bit</span>
<span class="token function">cat</span> /proc/cpuinfo <span class="token operator">|</span> <span class="token function">grep</span> flags <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">' lm '</span> <span class="token operator">|</span> <span class="token function">wc</span> <span class="token parameter variable">-l</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><h3 id="建立软连接" tabindex="-1"><a class="header-anchor" href="#建立软连接" aria-hidden="true">#</a> 建立软连接</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ln</span> <span class="token parameter variable">-s</span> /usr/local/jdk1.8/ jdk
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="rpm相关" tabindex="-1"><a class="header-anchor" href="#rpm相关" aria-hidden="true">#</a> rpm相关</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看是否通过rpm安装了该软件</span>
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> 软件名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="sshkey" tabindex="-1"><a class="header-anchor" href="#sshkey" aria-hidden="true">#</a> sshkey</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建sshkey</span>
ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> your_email@example.com

<span class="token comment">#id_rsa.pub 的内容拷贝到要控制的服务器的 home/username/.ssh/authorized_keys 中,如果没有则新建(.ssh权限为700, authorized_keys权限为600)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="命令重命名" tabindex="-1"><a class="header-anchor" href="#命令重命名" aria-hidden="true">#</a> 命令重命名</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在各个用户的.bash_profile中添加重命名配置</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ll</span><span class="token operator">=</span><span class="token string">'ls -alF'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="同步服务器时间" tabindex="-1"><a class="header-anchor" href="#同步服务器时间" aria-hidden="true">#</a> 同步服务器时间</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> ntpdate <span class="token parameter variable">-u</span> ntp.api.bz
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="后台运行命令" tabindex="-1"><a class="header-anchor" href="#后台运行命令" aria-hidden="true">#</a> 后台运行命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 后台运行,并且有nohup.out输出</span>
<span class="token function">nohup</span> xxx <span class="token operator">&amp;</span>

<span class="token comment"># 后台运行, 不输出任何日志</span>
<span class="token function">nohup</span> xxx <span class="token operator">></span> /dev/null <span class="token operator">&amp;</span>

<span class="token comment"># 后台运行, 并将错误信息做标准输出到日志中 </span>
<span class="token function">nohup</span> xxx <span class="token operator">></span>out.log <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="强制活动用户退出" tabindex="-1"><a class="header-anchor" href="#强制活动用户退出" aria-hidden="true">#</a> 强制活动用户退出</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 命令来完成强制活动用户退出.其中TTY表示终端名称</span>
<span class="token function">pkill</span> <span class="token parameter variable">-kill</span> <span class="token parameter variable">-t</span> <span class="token punctuation">[</span>TTY<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看命令路径" tabindex="-1"><a class="header-anchor" href="#查看命令路径" aria-hidden="true">#</a> 查看命令路径</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">which</span> <span class="token operator">&lt;</span>命令<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="查看进程所有打开最大fd数" tabindex="-1"><a class="header-anchor" href="#查看进程所有打开最大fd数" aria-hidden="true">#</a> 查看进程所有打开最大fd数</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">ulimit</span> <span class="token parameter variable">-n</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="配置dns" tabindex="-1"><a class="header-anchor" href="#配置dns" aria-hidden="true">#</a> 配置dns</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/resolv.conf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="nslookup-查看域名路由表" tabindex="-1"><a class="header-anchor" href="#nslookup-查看域名路由表" aria-hidden="true">#</a> nslookup,查看域名路由表</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">nslookup</span> google.com
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="last-最近登录信息列表" tabindex="-1"><a class="header-anchor" href="#last-最近登录信息列表" aria-hidden="true">#</a> last, 最近登录信息列表</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 最近登录的5个账号</span>
last <span class="token parameter variable">-n</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="设置固定ip" tabindex="-1"><a class="header-anchor" href="#设置固定ip" aria-hidden="true">#</a> 设置固定ip</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ifconfig</span> em1  <span class="token number">192.168</span>.5.177 netmask <span class="token number">255.255</span>.255.0
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="查看进程内加载的环境变量" tabindex="-1"><a class="header-anchor" href="#查看进程内加载的环境变量" aria-hidden="true">#</a> 查看进程内加载的环境变量</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 也可以去 cd /proc 目录下, 查看进程内存中加载的东西</span>
<span class="token function">ps</span> eww <span class="token parameter variable">-p</span>  XXXXX<span class="token punctuation">(</span>进程号<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看进程树找到服务器进程" tabindex="-1"><a class="header-anchor" href="#查看进程树找到服务器进程" aria-hidden="true">#</a> 查看进程树找到服务器进程</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> auwxf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="查看进程启动路径" tabindex="-1"><a class="header-anchor" href="#查看进程启动路径" aria-hidden="true">#</a> 查看进程启动路径</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /proc/xxx<span class="token punctuation">(</span>进程号<span class="token punctuation">)</span>
<span class="token function">ls</span> <span class="token parameter variable">-all</span>
<span class="token comment"># cwd对应的是启动路径</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="添加用户-配置sudo权限" tabindex="-1"><a class="header-anchor" href="#添加用户-配置sudo权限" aria-hidden="true">#</a> 添加用户, 配置sudo权限</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 新增用户</span>
<span class="token function">useradd</span> 用户名
<span class="token function">passwd</span> 用户名

<span class="token comment">#增加sudo权限</span>
<span class="token function">vim</span> /etc/sudoers
<span class="token comment"># 修改文件里面的</span>
<span class="token comment"># root    ALL=(ALL)       ALL</span>
<span class="token comment"># 用户名 ALL=(ALL)       ALL</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="强制关闭进程名包含xxx的所有进程" tabindex="-1"><a class="header-anchor" href="#强制关闭进程名包含xxx的所有进程" aria-hidden="true">#</a> 强制关闭进程名包含xxx的所有进程</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> aux<span class="token operator">|</span><span class="token function">grep</span> xxx <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $2}'</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span> <span class="token parameter variable">-9</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="磁盘-文件-目录相关操作" tabindex="-1"><a class="header-anchor" href="#磁盘-文件-目录相关操作" aria-hidden="true">#</a> 磁盘,文件,目录相关操作</h2>
<h3 id="vim操作" tabindex="-1"><a class="header-anchor" href="#vim操作" aria-hidden="true">#</a> vim操作</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#normal模式下 g表示全局, x表示查找的内容, y表示替换后的内容</span>
:%s/x/y/g

<span class="token comment">#normal模式下</span>
<span class="token number">0</span>  <span class="token comment"># 光标移到行首(数字0)</span>
$  <span class="token comment"># 光标移至行尾</span>
<span class="token builtin class-name">shift</span> + g <span class="token comment"># 跳到文件最后</span>
gg <span class="token comment"># 跳到文件头</span>

<span class="token comment"># 显示行号</span>
:set nu

<span class="token comment"># 去除行号</span>
:set nonu

<span class="token comment"># 检索</span>
/xxx<span class="token punctuation">(</span>检索内容<span class="token punctuation">)</span>  <span class="token comment"># 从头检索, 按n查找下一个</span>
?xxx<span class="token punctuation">(</span>检索内容<span class="token punctuation">)</span>  <span class="token comment"># 从尾部检索</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h3 id="打开只读文件-修改后需要保存时-不用切换用户即可保存的方式" tabindex="-1"><a class="header-anchor" href="#打开只读文件-修改后需要保存时-不用切换用户即可保存的方式" aria-hidden="true">#</a> 打开只读文件,修改后需要保存时(不用切换用户即可保存的方式)</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在normal模式下</span>
:w <span class="token operator">!</span>sudo <span class="token function">tee</span> %
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看磁盘-文件目录基本信息" tabindex="-1"><a class="header-anchor" href="#查看磁盘-文件目录基本信息" aria-hidden="true">#</a> 查看磁盘, 文件目录基本信息</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看磁盘挂载情况</span>
<span class="token function">mount</span>

<span class="token comment"># 查看磁盘分区信息</span>
<span class="token function">df</span>

<span class="token comment"># 查看目录及子目录大小</span>
<span class="token function">du</span> <span class="token parameter variable">-H</span> <span class="token parameter variable">-h</span>

<span class="token comment"># 查看当前目录下各个文件, 文件夹占了多少空间, 不会递归</span>
<span class="token function">du</span> <span class="token parameter variable">-sh</span> *
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="wc命令" tabindex="-1"><a class="header-anchor" href="#wc命令" aria-hidden="true">#</a> wc命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看文件里有多少行</span>
<span class="token function">wc</span> <span class="token parameter variable">-l</span> filename

<span class="token comment"># 看文件里有多少个word</span>
<span class="token function">wc</span> <span class="token parameter variable">-w</span> filename

<span class="token comment"># 文件里最长的那一行是多少个字</span>
<span class="token function">wc</span> <span class="token parameter variable">-L</span> filename

<span class="token comment"># 统计字节数</span>
<span class="token function">wc</span> <span class="token parameter variable">-c</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="常用压缩-解压缩命令" tabindex="-1"><a class="header-anchor" href="#常用压缩-解压缩命令" aria-hidden="true">#</a> 常用压缩, 解压缩命令</h3>
<h4 id="压缩命令" tabindex="-1"><a class="header-anchor" href="#压缩命令" aria-hidden="true">#</a> 压缩命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> czvf xxx.tar 压缩目录

<span class="token function">zip</span> <span class="token parameter variable">-r</span> xxx.zip 压缩目录
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="解压缩命令" tabindex="-1"><a class="header-anchor" href="#解压缩命令" aria-hidden="true">#</a> 解压缩命令</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tar</span> zxvf xxx.tar

<span class="token comment"># 解压到指定文件夹</span>
<span class="token function">tar</span> zxvf xxx.tar <span class="token parameter variable">-C</span> /xxx/yyy/

<span class="token function">unzip</span> xxx.zip
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="变更文件所属用户-用户组" tabindex="-1"><a class="header-anchor" href="#变更文件所属用户-用户组" aria-hidden="true">#</a> 变更文件所属用户, 用户组</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chown</span> eagleye.eagleye xxx.log
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="cp-scp-mkdir" tabindex="-1"><a class="header-anchor" href="#cp-scp-mkdir" aria-hidden="true">#</a> cp, scp, mkdir</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#复制</span>
<span class="token function">cp</span> xxx.log

<span class="token comment"># 复制并强制覆盖同名文件</span>
<span class="token function">cp</span> <span class="token parameter variable">-f</span> xxx.log

<span class="token comment"># 复制文件夹</span>
<span class="token function">cp</span> <span class="token parameter variable">-r</span> xxx<span class="token punctuation">(</span>源文件夹<span class="token punctuation">)</span> yyy<span class="token punctuation">(</span>目标文件夹<span class="token punctuation">)</span>

<span class="token comment"># 远程复制</span>
<span class="token function">scp</span> <span class="token parameter variable">-P</span> ssh端口 username@10.10.10.101:/home/username/xxx /home/xxx

<span class="token comment"># 级联创建目录</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /xxx/yyy/zzz

<span class="token comment"># 批量创建文件夹, 会在test,main下都创建java, resources文件夹</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> src/<span class="token punctuation">{</span>test,main<span class="token punctuation">}</span>/<span class="token punctuation">{</span>java,resources<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="比较两个文件" tabindex="-1"><a class="header-anchor" href="#比较两个文件" aria-hidden="true">#</a> 比较两个文件</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">diff</span> <span class="token parameter variable">-u</span> <span class="token number">1</span>.txt <span class="token number">2</span>.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="日志输出的字节数-可以用作性能测试" tabindex="-1"><a class="header-anchor" href="#日志输出的字节数-可以用作性能测试" aria-hidden="true">#</a> 日志输出的字节数,可以用作性能测试</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如果做性能测试, 可以每执行一次, 往日志里面输出 “.” , 这样日志中的字节数就是实际的性能测试运行的次数, 还可以看见实时速率.</span>
<span class="token function">tail</span> <span class="token parameter variable">-f</span> xxx.log <span class="token operator">|</span> <span class="token function">pv</span> <span class="token parameter variable">-bt</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="查看-去除特殊字符" tabindex="-1"><a class="header-anchor" href="#查看-去除特殊字符" aria-hidden="true">#</a> 查看, 去除特殊字符</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看特殊字符</span>
<span class="token function">cat</span> <span class="token parameter variable">-v</span> xxx.sh

<span class="token comment"># 去除特殊字符</span>
<span class="token function">sed</span> <span class="token parameter variable">-i</span> 's/^M//g’ env.sh  去除文件的特殊字符, 比如^M:  需要这样输入: ctrl+v+enter
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="处理因系统原因引起的文件中特殊字符的问题" tabindex="-1"><a class="header-anchor" href="#处理因系统原因引起的文件中特殊字符的问题" aria-hidden="true">#</a> 处理因系统原因引起的文件中特殊字符的问题</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 可以转换为该系统下的文件格式</span>
<span class="token function">cat</span> file.sh <span class="token operator">></span> file.sh_bak

<span class="token comment"># 先将file.sh中文件内容复制下来然后运行, 然后粘贴内容, 最后ctrl + d 保存退出</span>
<span class="token function">cat</span> <span class="token operator">></span> file1.sh

<span class="token comment"># 在vim中通过如下设置文件编码和文件格式</span>
:set <span class="token assign-left variable">fileencodings</span><span class="token operator">=</span>utf-8 ，然后 w （存盘）一下即可转化为 utf8 格式，
:set <span class="token assign-left variable">fileformat</span><span class="token operator">=</span>unix

<span class="token comment"># 在mac下使用dos2unix进行文件格式化</span>
<span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">"*.sh"</span> <span class="token operator">|</span> <span class="token function">xargs</span> dos2unix
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="tee-重定向的同时输出到屏幕" tabindex="-1"><a class="header-anchor" href="#tee-重定向的同时输出到屏幕" aria-hidden="true">#</a> tee, 重定向的同时输出到屏幕</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">awk</span> ‘<span class="token punctuation">{</span>print <span class="token variable">$0</span><span class="token punctuation">}</span>’ xxx.log <span class="token operator">|</span> <span class="token function">tee</span> test.log
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="检索相关" tabindex="-1"><a class="header-anchor" href="#检索相关" aria-hidden="true">#</a> 检索相关</h2>
<h3 id="grep" tabindex="-1"><a class="header-anchor" href="#grep" aria-hidden="true">#</a> grep</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 反向匹配, 查找不包含xxx的内容</span>
<span class="token function">grep</span> <span class="token parameter variable">-v</span> xxx

<span class="token comment"># 排除所有空行</span>
<span class="token function">grep</span> <span class="token parameter variable">-v</span> '^/pre<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 返回结果 2,则说明第二行是空行</span>
<span class="token function">grep</span> <span class="token parameter variable">-n</span> “^$” <span class="token number">111</span>.txt    

<span class="token comment"># 查询以abc开头的行</span>
<span class="token function">grep</span> <span class="token parameter variable">-n</span> “^abc” <span class="token number">111</span>.txt 

<span class="token comment"># 同时列出该词语出现在文章的第几行</span>
<span class="token function">grep</span> <span class="token string">'xxx'</span> <span class="token parameter variable">-n</span> xxx.log

<span class="token comment"># 计算一下该字串出现的次数</span>
<span class="token function">grep</span> <span class="token string">'xxx'</span> <span class="token parameter variable">-c</span> xxx.log

<span class="token comment"># 比对的时候，不计较大小写的不同</span>
<span class="token function">grep</span> <span class="token string">'xxx'</span> <span class="token parameter variable">-i</span> xxx.log
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h3 id="awk" tabindex="-1"><a class="header-anchor" href="#awk" aria-hidden="true">#</a> awk</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 以':' 为分隔符,如果第五域有user则输出该行</span>
<span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">':'</span> <span class="token string">'{if ($5 ~ /user/) print $0}'</span> /etc/passwd 

<span class="token comment"># 统计单个文件中某个字符（串）(中文无效)出现的次数</span>
<span class="token function">awk</span> <span class="token parameter variable">-v</span> <span class="token assign-left variable">RS</span><span class="token operator">=</span><span class="token string">'character'</span> <span class="token string">'END {print --NR}'</span> xxx.txt
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="find检索命令" tabindex="-1"><a class="header-anchor" href="#find检索命令" aria-hidden="true">#</a> find检索命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 在目录下找后缀是.mysql的文件</span>
<span class="token function">find</span> /home/eagleye <span class="token parameter variable">-name</span> <span class="token string">'*.mysql'</span> <span class="token parameter variable">-print</span>

<span class="token comment"># 会从 /usr 目录开始往下找，找最近3天之内存取过的文件。</span>
<span class="token function">find</span> /usr <span class="token parameter variable">-atime</span> <span class="token number">3</span> –print

<span class="token comment"># 会从 /usr 目录开始往下找，找最近5天之内修改过的文件。</span>
<span class="token function">find</span> /usr <span class="token parameter variable">-ctime</span> <span class="token number">5</span> –print

<span class="token comment"># 会从 /doc 目录开始往下找，找jacky 的、文件名开头是 j的文件。  </span>
<span class="token function">find</span> /doc <span class="token parameter variable">-user</span> jacky <span class="token parameter variable">-name</span> <span class="token string">'j*'</span> –print

<span class="token comment"># 会从 /doc 目录开始往下找，找寻文件名是 ja 开头或者 ma开头的文件。</span>
<span class="token function">find</span> /doc <span class="token punctuation">\</span><span class="token punctuation">(</span> <span class="token parameter variable">-name</span> <span class="token string">'ja*'</span> -o- <span class="token parameter variable">-name</span> <span class="token string">'ma*'</span> <span class="token punctuation">\</span><span class="token punctuation">)</span> –print

<span class="token comment">#  会从 /doc 目录开始往下找，找到凡是文件名结尾为 bak的文件，把它删除掉。-exec 选项是执行的意思，rm 是删除命令，{ } 表示文件名，“\;”是规定的命令结尾。 </span>
<span class="token function">find</span> /doc <span class="token parameter variable">-name</span> <span class="token string">'*bak'</span> <span class="token parameter variable">-exec</span> <span class="token function">rm</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">\</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="网络相关" tabindex="-1"><a class="header-anchor" href="#网络相关" aria-hidden="true">#</a> 网络相关</h2>
<h3 id="查看什么进程使用了该端口" tabindex="-1"><a class="header-anchor" href="#查看什么进程使用了该端口" aria-hidden="true">#</a> 查看什么进程使用了该端口</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">lsof</span> <span class="token parameter variable">-i:port</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="获取本机ip地址" tabindex="-1"><a class="header-anchor" href="#获取本机ip地址" aria-hidden="true">#</a> 获取本机ip地址</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/sbin/ifconfig -a<span class="token operator">|</span><span class="token function">grep</span> inet<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token number">127.0</span>.0.1<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-v</span> inet6<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'{print $2}'</span><span class="token operator">|</span><span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">"addr:"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="iptables" tabindex="-1"><a class="header-anchor" href="#iptables" aria-hidden="true">#</a> iptables</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看iptables状态</span>
<span class="token function">service</span> iptables status

<span class="token comment"># 要封停一个ip</span>
iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-s</span> ***.***.***.*** <span class="token parameter variable">-j</span> DROP

<span class="token comment"># 要解封一个IP，使用下面这条命令：</span>
iptables <span class="token parameter variable">-D</span> INPUT <span class="token parameter variable">-s</span> ***.***.***.*** <span class="token parameter variable">-j</span> DROP

备注: 参数-I是表示Insert（添加），-D表示Delete（删除）。后面跟的是规则，INPUT表示入站，***.***.***.***表示要封停的IP，DROP表示放弃连接。

<span class="token comment">#开启9090端口的访问</span>
/sbin/iptables <span class="token parameter variable">-I</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">9090</span> <span class="token parameter variable">-j</span> ACCEPT 

<span class="token comment"># 防火墙开启、关闭、重启</span>
/etc/init.d/iptables status
/etc/init.d/iptables start
/etc/init.d/iptables stop
/etc/init.d/iptables restart
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h3 id="nc命令-tcp调试利器" tabindex="-1"><a class="header-anchor" href="#nc命令-tcp调试利器" aria-hidden="true">#</a> nc命令, tcp调试利器</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#给某一个endpoint发送TCP请求,就将data的内容发送到对端</span>
<span class="token function">nc</span> <span class="token number">192.168</span>.0.11 <span class="token number">8000</span> <span class="token operator">&lt;</span> data.txt

<span class="token comment">#nc可以当做服务器，监听某个端口号,把某一次请求的内容存储到received_data里</span>
<span class="token function">nc</span> <span class="token parameter variable">-l</span> <span class="token number">8000</span> <span class="token operator">></span> received_data

<span class="token comment">#上边只监听一次，如果多次可以加上-k参数</span>
<span class="token function">nc</span> <span class="token parameter variable">-lk</span> <span class="token number">8000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="tcpdump" tabindex="-1"><a class="header-anchor" href="#tcpdump" aria-hidden="true">#</a> tcpdump</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># dump出本机12301端口的tcp包</span>
tcpdump <span class="token parameter variable">-i</span> em1 tcp port <span class="token number">12301</span> <span class="token parameter variable">-s</span> <span class="token number">1500</span> <span class="token parameter variable">-w</span> abc.pcap
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="跟踪网络路由路径" tabindex="-1"><a class="header-anchor" href="#跟踪网络路由路径" aria-hidden="true">#</a> 跟踪网络路由路径</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># traceroute默认使用udp方式, 如果是-I则改成icmp方式</span>
<span class="token function">traceroute</span> <span class="token parameter variable">-I</span> www.163.com

<span class="token comment"># 从ttl第3跳跟踪</span>
<span class="token function">traceroute</span> <span class="token parameter variable">-M</span> <span class="token number">3</span> www.163.com  

<span class="token comment"># 加上端口跟踪</span>
<span class="token function">traceroute</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span> <span class="token number">192.168</span>.10.11
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="ss" tabindex="-1"><a class="header-anchor" href="#ss" aria-hidden="true">#</a> ss</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 显示本地打开的所有端口</span>
ss <span class="token parameter variable">-l</span> 

<span class="token comment"># 显示每个进程具体打开的socket</span>
ss <span class="token parameter variable">-pl</span> 

<span class="token comment"># 显示所有tcp socket</span>
ss <span class="token parameter variable">-t</span> <span class="token parameter variable">-a</span> 

<span class="token comment"># 显示所有的UDP Socekt</span>
ss <span class="token parameter variable">-u</span> <span class="token parameter variable">-a</span> 

<span class="token comment"># 显示所有已建立的SMTP连接</span>
ss <span class="token parameter variable">-o</span> state established <span class="token string">'( dport = :smtp or sport = :smtp )'</span>  

<span class="token comment"># 显示所有已建立的HTTP连接 </span>
ss <span class="token parameter variable">-o</span> state established <span class="token string">'( dport = :http or sport = :http )'</span>  

找出所有连接X服务器的进程
ss <span class="token parameter variable">-x</span> src /tmp/.X11-unix/*  

列出当前socket统计信息
ss <span class="token parameter variable">-s</span> 

解释：netstat是遍历/proc下面每个PID目录，ss直接读/proc/net下面的统计信息。所以ss执行的时候消耗资源以及消耗的时间都比netstat少很多
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><h3 id="netstat" tabindex="-1"><a class="header-anchor" href="#netstat" aria-hidden="true">#</a> netstat</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 输出每个ip的连接数，以及总的各个状态的连接数</span>
<span class="token function">netstat</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'/^tcp/ {n=split($(NF-1),array,":");if(n&lt;=2)++S[array[(1)]];else++S[array[(4)]];++s[$NF];++N} END {for(a in S){printf("%-20s %s\n", a, S[a]);++I}printf("%-20s %s\n","TOTAL_IP",I);for(a in s) printf("%-20s %s\n",a, s[a]);printf("%-20s %s\n","TOTAL_LINK",N);}'</span>

<span class="token comment"># 统计所有连接状态, </span>
<span class="token comment"># CLOSED：无连接是活动的或正在进行</span>
<span class="token comment"># LISTEN：服务器在等待进入呼叫</span>
<span class="token comment"># SYN_RECV：一个连接请求已经到达，等待确认</span>
<span class="token comment"># SYN_SENT：应用已经开始，打开一个连接</span>
<span class="token comment"># ESTABLISHED：正常数据传输状态</span>
<span class="token comment"># FIN_WAIT1：应用说它已经完成</span>
<span class="token comment"># FIN_WAIT2：另一边已同意释放</span>
<span class="token comment"># ITMED_WAIT：等待所有分组死掉</span>
<span class="token comment"># CLOSING：两边同时尝试关闭</span>
<span class="token comment"># TIME_WAIT：主动关闭连接一端还没有等到另一端反馈期间的状态</span>
<span class="token comment"># LAST_ACK：等待所有分组死掉</span>
<span class="token function">netstat</span> <span class="token parameter variable">-n</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'/^tcp/ {++state[$NF]} END {for(key in state) print key,"\t",state[key]}'</span>

<span class="token comment"># 查找较多time_wait连接</span>
<span class="token function">netstat</span> -n<span class="token operator">|</span><span class="token function">grep</span> TIME_WAIT<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'{print $5}'</span><span class="token operator">|</span><span class="token function">sort</span><span class="token operator">|</span><span class="token function">uniq</span> -c<span class="token operator">|</span><span class="token function">sort</span> -rn<span class="token operator">|</span><span class="token function">head</span> <span class="token parameter variable">-n20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="监控linux性能命令" tabindex="-1"><a class="header-anchor" href="#监控linux性能命令" aria-hidden="true">#</a> 监控linux性能命令</h2>
<h3 id="top" tabindex="-1"><a class="header-anchor" href="#top" aria-hidden="true">#</a> top</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>按大写的 F 或 O 键，然后按 a-z 可以将进程按照相应的列进行排序, 然后回车。而大写的 R 键可以将当前的排序倒转
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>列名</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>PID</td>
<td>进程id</td>
</tr>
<tr>
<td>PPID</td>
<td>父进程id</td>
</tr>
<tr>
<td>RUSER</td>
<td>Real user name</td>
</tr>
<tr>
<td>UID</td>
<td>进程所有者的用户id</td>
</tr>
<tr>
<td>USER</td>
<td>进程所有者的用户名</td>
</tr>
<tr>
<td>GROUP</td>
<td>进程所有者的组名</td>
</tr>
<tr>
<td>TTY</td>
<td>启动进程的终端名。不是从终端启动的进程则显示为 ?</td>
</tr>
<tr>
<td>PR</td>
<td>优先级</td>
</tr>
<tr>
<td>NI</td>
<td>nice值。负值表示高优先级，正值表示低优先级</td>
</tr>
<tr>
<td>P</td>
<td>最后使用的CPU，仅在多CPU环境下有意义</td>
</tr>
<tr>
<td>%CPU</td>
<td>上次更新到现在的CPU时间占用百分比</td>
</tr>
<tr>
<td>TIME</td>
<td>进程使用的CPU时间总计，单位秒</td>
</tr>
<tr>
<td>TIME+</td>
<td>进程使用的CPU时间总计，单位1/100秒</td>
</tr>
<tr>
<td>%MEM</td>
<td>进程使用的物理内存百分比</td>
</tr>
<tr>
<td>VIRT</td>
<td>进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES</td>
</tr>
<tr>
<td>SWAP</td>
<td>进程使用的虚拟内存中，被换出的大小，单位kb。</td>
</tr>
<tr>
<td>RES</td>
<td>进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA</td>
</tr>
<tr>
<td>CODE</td>
<td>可执行代码占用的物理内存大小，单位kb</td>
</tr>
<tr>
<td>DATA</td>
<td>可执行代码以外的部分(数据段+栈)占用的物理内存大小，单位kb</td>
</tr>
<tr>
<td>SHR</td>
<td>共享内存大小，单位kb</td>
</tr>
<tr>
<td>nFLT</td>
<td>页面错误次数</td>
</tr>
<tr>
<td>nDRT</td>
<td>最后一次写入到现在，被修改过的页面数。</td>
</tr>
<tr>
<td>S</td>
<td>进程状态。D=不可中断的睡眠状态,R=运行,S=睡眠,T=跟踪/停止,Z=僵尸进程</td>
</tr>
<tr>
<td>COMMAND</td>
<td>命令名/命令行</td>
</tr>
<tr>
<td>WCHAN</td>
<td>若该进程在睡眠，则显示睡眠中的系统函数名</td>
</tr>
<tr>
<td>Flags</td>
<td>任务标志，参考 sched.h</td>
</tr>
</tbody>
</table>
<h3 id="dmesg-查看系统日志" tabindex="-1"><a class="header-anchor" href="#dmesg-查看系统日志" aria-hidden="true">#</a> dmesg,查看系统日志</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">dmesg</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="iostat-磁盘io情况监控" tabindex="-1"><a class="header-anchor" href="#iostat-磁盘io情况监控" aria-hidden="true">#</a> iostat,磁盘IO情况监控</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>iostat <span class="token parameter variable">-xz</span> <span class="token number">1</span>

<span class="token comment"># r/s, w/s, rkB/s, wkB/s：分别表示每秒读写次数和每秒读写数据量（千字节）。读写量过大，可能会引起性能问题。</span>
<span class="token comment"># await：IO操作的平均等待时间，单位是毫秒。这是应用程序在和磁盘交互时，需要消耗的时间，包括IO等待和实际操作的耗时。如果这个数值过大，可能是硬件设备遇到了瓶颈或者出现故障。</span>
<span class="token comment"># avgqu-sz：向设备发出的请求平均数量。如果这个数值大于1，可能是硬件设备已经饱和（部分前端硬件设备支持并行写入）。</span>
<span class="token comment"># %util：设备利用率。这个数值表示设备的繁忙程度，经验值是如果超过60，可能会影响IO性能（可以参照IO操作平均等待时间）。如果到达100%，说明硬件设备已经饱和。</span>
<span class="token comment"># 如果显示的是逻辑设备的数据，那么设备利用率不代表后端实际的硬件设备已经饱和。值得注意的是，即使IO性能不理想，也不一定意味这应用程序性能会不好，可以利用诸如预读取、写缓存等策略提升应用性能。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="free-内存使用情况" tabindex="-1"><a class="header-anchor" href="#free-内存使用情况" aria-hidden="true">#</a> free,内存使用情况</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">free</span> <span class="token parameter variable">-m</span>

eg:

     total       used       <span class="token function">free</span>     shared    buffers     cached
Mem:          <span class="token number">1002</span>        <span class="token number">769</span>        <span class="token number">232</span>          <span class="token number">0</span>         <span class="token number">62</span>        <span class="token number">421</span>
-/+ buffers/cache:          <span class="token number">286</span>        <span class="token number">715</span>
Swap:          <span class="token number">1153</span>          <span class="token number">0</span>       <span class="token number">1153</span>

第一部分Mem行:
total 内存总数: 1002M
used 已经使用的内存数: 769M
<span class="token function">free</span> 空闲的内存数: 232M
shared 当前已经废弃不用,总是0
buffers Buffer 缓存内存数: 62M
cached Page 缓存内存数:421M

关系：total<span class="token punctuation">(</span>1002M<span class="token punctuation">)</span> <span class="token operator">=</span> used<span class="token punctuation">(</span>769M<span class="token punctuation">)</span> + free<span class="token punctuation">(</span>232M<span class="token punctuation">)</span>

第二部分<span class="token punctuation">(</span>-/+ buffers/cache<span class="token punctuation">)</span>:
<span class="token punctuation">(</span>-buffers/cache<span class="token punctuation">)</span> used内存数：286M <span class="token punctuation">(</span>指的第一部分Mem行中的used – buffers – cached<span class="token punctuation">)</span>
<span class="token punctuation">(</span>+buffers/cache<span class="token punctuation">)</span> free内存数: 715M <span class="token punctuation">(</span>指的第一部分Mem行中的free + buffers + cached<span class="token punctuation">)</span>

可见-buffers/cache反映的是被程序实实在在吃掉的内存,而+buffers/cache反映的是可以挪用的内存总数.

第三部分是指交换分区
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="sar-查看网络吞吐状态" tabindex="-1"><a class="header-anchor" href="#sar-查看网络吞吐状态" aria-hidden="true">#</a> sar,查看网络吞吐状态</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># sar命令在这里可以查看网络设备的吞吐率。在排查性能问题时，可以通过网络设备的吞吐量，判断网络设备是否已经饱和</span>
sar <span class="token parameter variable">-n</span> DEV <span class="token number">1</span>

<span class="token comment">#</span>
<span class="token comment"># sar命令在这里用于查看TCP连接状态，其中包括：</span>
<span class="token comment"># active/s：每秒本地发起的TCP连接数，既通过connect调用创建的TCP连接；</span>
<span class="token comment"># passive/s：每秒远程发起的TCP连接数，即通过accept调用创建的TCP连接；</span>
<span class="token comment"># retrans/s：每秒TCP重传数量；</span>
<span class="token comment"># TCP连接数可以用来判断性能问题是否由于建立了过多的连接，进一步可以判断是主动发起的连接，还是被动接受的连接。TCP重传可能是因为网络环境恶劣，或者服务器压力过大导致丢包</span>
sar <span class="token parameter variable">-n</span> TCP,ETCP <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="vmstat-给定时间监控cpu使用率-内存使用-虚拟内存交互-io读写" tabindex="-1"><a class="header-anchor" href="#vmstat-给定时间监控cpu使用率-内存使用-虚拟内存交互-io读写" aria-hidden="true">#</a> vmstat, 给定时间监控CPU使用率, 内存使用, 虚拟内存交互, IO读写</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 2表示每2秒采集一次状态信息, 1表示只采集一次(忽略既是一直采集)</span>
<span class="token function">vmstat</span> <span class="token number">2</span> <span class="token number">1</span>

eg:
r b swpd <span class="token function">free</span> buff cache si so bi bo <span class="token keyword">in</span> cs us sy <span class="token function">id</span> wa
<span class="token number">1</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">3499840</span> <span class="token number">315836</span> <span class="token number">3819660</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">2</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">100</span> <span class="token number">0</span>
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">3499584</span> <span class="token number">315836</span> <span class="token number">3819660</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">88</span> <span class="token number">158</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">100</span> <span class="token number">0</span>
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">3499708</span> <span class="token number">315836</span> <span class="token number">3819660</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">2</span> <span class="token number">86</span> <span class="token number">162</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">100</span> <span class="token number">0</span>
<span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">3499708</span> <span class="token number">315836</span> <span class="token number">3819660</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">10</span> <span class="token number">81</span> <span class="token number">151</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">100</span> <span class="token number">0</span>
<span class="token number">1</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">3499732</span> <span class="token number">315836</span> <span class="token number">3819660</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">2</span> <span class="token number">83</span> <span class="token number">154</span> <span class="token number">0</span> <span class="token number">0</span> <span class="token number">100</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul>
<li>r 表示运行队列(就是说多少个进程真的分配到CPU)，我测试的服务器目前CPU比较空闲，没什么程序在跑，当这个值超过了CPU数目，就会出现CPU瓶颈了。这个也和top的负载有关系，一般负载超过了3就比较高，超过了5就高，超过了10就不正常了，服务器的状态很危险。top的负载类似每秒的运行队列。如果运行队列过大，表示你的CPU很繁忙，一般会造成CPU使用率很高。</li>
<li>b 表示阻塞的进程,这个不多说，进程阻塞，大家懂的。</li>
<li>swpd 虚拟内存已使用的大小，如果大于0，表示你的机器物理内存不足了，如果不是程序内存泄露的原因，那么你该升级内存了或者把耗内存的任务迁移到其他机器。</li>
<li>free 空闲的物理内存的大小，我的机器内存总共8G，剩余3415M。</li>
<li>buff Linux/Unix系统是用来存储，目录里面有什么内容，权限等的缓存，我本机大概占用300多M</li>
<li>cache cache直接用来记忆我们打开的文件,给文件做缓冲，我本机大概占用300多M(这里是Linux/Unix的聪明之处，把空闲的物理内存的一部分拿来做文件和目录的缓存，是为了提高 程序执行的性能，当程序使用内存时，buffer/cached会很快地被使用。)</li>
<li>si 每秒从磁盘读入虚拟内存的大小，如果这个值大于0，表示物理内存不够用或者内存泄露了，要查找耗内存进程解决掉。我的机器内存充裕，一切正常。</li>
<li>so 每秒虚拟内存写入磁盘的大小，如果这个值大于0，同上。</li>
<li>bi 块设备每秒接收的块数量，这里的块设备是指系统上所有的磁盘和其他块设备，默认块大小是1024byte，我本机上没什么IO操作，所以一直是0，但是我曾在处理拷贝大量数据(2-3T)的机器上看过可以达到140000/s，磁盘写入速度差不多140M每秒</li>
<li>bo 块设备每秒发送的块数量，例如我们读取文件，bo就要大于0。bi和bo一般都要接近0，不然就是IO过于频繁，需要调整。</li>
<li>in 每秒CPU的中断次数，包括时间中断</li>
<li>cs 每秒上下文切换次数，例如我们调用系统函数，就要进行上下文切换，线程的切换，也要进程上下文切换，这个值要越小越好，太大了，要考虑调低线程或者进程的数目,例如在apache和nginx这种web服务器中，我们一般做性能测试时会进行几千并发甚至几万并发的测试，选择web服务器的进程可以由进程或者线程的峰值一直下调，压测，直到cs到一个比较小的值，这个进程和线程数就是比较合适的值了。系统调用也是，每次调用系统函数，我们的代码就会进入内核空间，导致上下文切换，这个是很耗资源，也要尽量避免频繁调用系统函数。上下文切换次数过多表示你的CPU大部分浪费在上下文切换，导致CPU干正经事的时间少了，CPU没有充分利用，是不可取的。</li>
<li>us 用户CPU时间，我曾经在一个做加密解密很频繁的服务器上，可以看到us接近100,r运行队列达到80(机器在做压力测试，性能表现不佳)。</li>
<li>sy 系统CPU时间，如果太高，表示系统调用时间长，例如是IO操作频繁。</li>
<li>id 空闲 CPU时间，一般来说，id + us + sy = 100,一般我认为id是空闲CPU使用率，us是用户CPU使用率，sy是系统CPU使用率。</li>
<li>wt 等待IO CPU时间。</li>
</ul>
</template>

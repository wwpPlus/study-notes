<template><h1 id="科研实践创新平台" tabindex="-1"><a class="header-anchor" href="#科研实践创新平台" aria-hidden="true">#</a> 科研实践创新平台</h1>
<ul>
<li>实现项目全流程管理</li>
<li>项目立项、项目实施过程跟踪反馈</li>
<li>以项目为核心的资源汇聚</li>
<li>成为科研成果训练、科研成果转化的科研综合实践平台</li>
<li>以课程为中心的综合实验管理平台</li>
<li>提高教研成果的产出</li>
</ul>
<h2 id="教师端使用教程" tabindex="-1"><a class="header-anchor" href="#教师端使用教程" aria-hidden="true">#</a> 教师端使用教程</h2>
<p>教师端主要功能</p>
<ul>
<li>创建项目</li>
<li>新建课题</li>
<li>分发任务</li>
<li>查看进度</li>
</ul>
<h3 id="项目管理" tabindex="-1"><a class="header-anchor" href="#项目管理" aria-hidden="true">#</a> 项目管理</h3>
<p>监控项目完整周期</p>
<ul>
<li>
<p>创建项目，设置项目完成时间并添加项目资料</p>
<p><img src="@source/Project/imgs/experimental-platform/创建项目.jpg" alt="图片"></p>
<p>新创建的项目处于待审核状态，经管理员审核通过后可进行后续操作，项目审核通过后，在成员列表下增加项目成员或删除项目成员，添加项目成员时可通过成员所属分组进行批量添加</p>
<p><img src="@source/Project/imgs/experimental-platform/添加成员.jpg" alt="图片"></p>
</li>
</ul>
<blockquote>
<p>注: 项目成员权限为项目负责人权限，谨慎授权</p>
</blockquote>
<ul>
<li>
<p>在项目附件管理中可以看到创建项目时添加的项目资料（项目必备资料文件夹中），也可在此追加项目资料</p>
<p><img src="@source/Project/imgs/experimental-platform/追加项目资料.jpg" alt="图片"></p>
</li>
<li>
<p>项目可以细化为多个课题，在课题列表下管理课题的发布、版本迭代及版本配置</p>
<p><img src="@source/Project/imgs/experimental-platform/课题列表.jpg" alt="课题列表"></p>
</li>
<li>
<p>项目资料和问题交流中可以进行项目相关问题的交流讨论，形成文字资料以便学习参考，使用时需要新增交流问题的分类，可以选择针对具体课题、具体版本</p>
<p><img src="@source/Project/imgs/experimental-platform/项目资料.jpg" alt="项目资料"></p>
<p>项目动态查看整个项目的具体完成情况</p>
<p><img src="@source/Project/imgs/experimental-platform/项目动态.jpg" alt="项目动态"></p>
</li>
</ul>
<h3 id="课题与版本" tabindex="-1"><a class="header-anchor" href="#课题与版本" aria-hidden="true">#</a> 课题与版本</h3>
<p>在项目管理下的课题列表中对课题进行发布、配置、版本迭代操作</p>
<ul>
<li>
<p>新增课题，课题初始版本号默认为 1.0.0，再从项目成员中选择课题负责人</p>
<ul>
<li>普通课题</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/创建课题.jpg" alt="创建课题"></p>
<ul>
<li>在线课题
<ul>
<li>需要选择课题对应的实验环境，其中可以根据实验所需资源选择不同级别的运行时资源</li>
<li>根据实验所需环境选择运行时环境，运行时环境分为公开镜像和自定义的私有镜像</li>
<li>其中实验创建方式分为自定义创建和模板创建，在模板创建中可以使用已经成功分享的实验案例创建自己的实验模板</li>
<li>数据集选择功能提供数据集平台中已存在的数据，选择添加数据集后，在实验环境目录下可以看到数据集文件，此时的数据集文件只是一个索引文件，不占用磁盘空间，只有实际使用到某一个具体数据文件时数据才会被拷贝到当前目录下</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/在线课题.jpg" alt="在线课题"></p>
<p>发布课题，可以选择课题的有效期和发布时间，课题当前版本发布后可通过生成版本，自动生成下一个版本号进行版本迭代</p>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/发布课题.jpg" alt="发布课题"></p>
<ul>
<li>
<p>注: 同一课题下只能有一个未发布的版本</p>
</li>
<li>
<p>配置课题</p>
<ul>
<li>配置在线课题，在此配置课题实验的模板，课题下的任务可在此模板基础上完成任务</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/配置普通课题.jpg" alt="配置在线课题"></p>
<p>注: 此处普通课题可以配置开始和结束时间以及课题内容，在线课题则是进入实验页面进行实验的配置</p>
</li>
</ul>
<h3 id="任务管理与发布" tabindex="-1"><a class="header-anchor" href="#任务管理与发布" aria-hidden="true">#</a> 任务管理与发布</h3>
<ul>
<li>课题版本发布后，在任务管理中可以看到课题生成对应的任务，此时任务处于未完成状态，点击进入开始下发任务</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/任务管理.jpg" alt="任务管理"></p>
<ul>
<li>布置任务
<ul>
<li>选择任务为公有或私有，私有任务可以下发到个人，公有任务则所有人可见</li>
<li>通过团队搜索实现下发任务到多人，也可以进行用户搜索选择下发任务到具体个人，配置任务开始和结束时间以及汇报规则，方便查看任务进度</li>
<li>任务下发后，在接受到任务的账号中查看对应任务并进行进度汇报</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/布置任务.jpg" alt="布置任务"></p>
<ul>
<li>查看任务进度
<ul>
<li>在任务管理中查看已下发任务的实时进度</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/任务进度.jpg" alt="任务进度"></p>
<ul>
<li>审核任务
<ul>
<li>学生在汇报任务时提交任务进度为 100%，任务进入待审核状态，老师进入任务管理在汇报成员详细信息中进行任务审核</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/审核任务.jpg" alt="审核任务"></p>
<h3 id="首页动态使用" tabindex="-1"><a class="header-anchor" href="#首页动态使用" aria-hidden="true">#</a> 首页动态使用</h3>
<ul>
<li>首页查看统计信息
<ul>
<li>进入首页查看当前账号下创建的项目、课题总数，以及已完成和进行中的任务数量</li>
<li>查看项目动态和课题动态</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/首页.jpg" alt="首页"></p>
<h3 id="配置在线课题" tabindex="-1"><a class="header-anchor" href="#配置在线课题" aria-hidden="true">#</a> 配置在线课题</h3>
<ul>
<li>任务升级对应提升在线课题实验环境的运行时资源以及运行时环境依赖</li>
<li>在此处可以进行任务发布</li>
<li>左侧数据集菜单可以选择本地上传或者是使用系统连通的数据集平台提供的数据集</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/配置在线课题.jpg" alt="配置在线课题"></p>
<blockquote>
<p>注: 发布任务时需要生成任务模板后才可发布</p>
</blockquote>
<h2 id="学生端使用教程" tabindex="-1"><a class="header-anchor" href="#学生端使用教程" aria-hidden="true">#</a> 学生端使用教程</h2>
<p>学生端主要功能</p>
<ul>
<li>进行自主实验</li>
<li>定制私有镜像</li>
<li>任务汇报</li>
<li>公开项目</li>
<li>交流学习</li>
</ul>
<h3 id="自主实验" tabindex="-1"><a class="header-anchor" href="#自主实验" aria-hidden="true">#</a> 自主实验</h3>
<p>利用实验室资源做实验</p>
<p><img src="@source/Project/imgs/experimental-platform/自主实验.jpg" alt="自主实验"></p>
<ul>
<li>
<p>创建实验</p>
<ul>
<li>选择环境类型
<ul>
<li><strong>VS code(推荐使用)</strong></li>
<li>notebook</li>
<li>远程桌面</li>
</ul>
</li>
<li>运行时环境（包含公开镜像和私有镜像）</li>
<li>选择数据集（此处对接数据集平台，选择数据集后，数据集将通过网盘挂载的形式存放在实验项目目录中，具体呈现形式见下方实验环境）
<img src="@source/Project/imgs/experimental-platform/创建实验.jpg" alt="创建实验"></li>
</ul>
</li>
<li>
<p>启动实验</p>
<ul>
<li>启动实验前需要选择运行资源即实验室提供的算力资源，根据算力高低，所需要的积分也是由低到高</li>
<li>积分规则：每周日零点积分重置，积分为 0 时将无法使用 GPU 资源，可通过每日登录、汇报等方式获取积分</li>
<li>积分记录：点击右侧积分记录查看实验过程中积分的使用情况</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/启动实验.jpg" alt="启动实验"></p>
<h3 id="实验环境-vs-code" tabindex="-1"><a class="header-anchor" href="#实验环境-vs-code" aria-hidden="true">#</a> 实验环境（VS Code）</h3>
<p>实验页面全貌如下，包含的主要功能有：</p>
<ul>
<li>保存实验环境</li>
<li>模型部署</li>
<li>代码助手</li>
<li>分享实验</li>
<li>实验基本信息</li>
<li>数据集查看</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/实验环境.jpg" alt="实验环境"></p>
<h4 id="数据集相关功能" tabindex="-1"><a class="header-anchor" href="#数据集相关功能" aria-hidden="true">#</a> 数据集相关功能</h4>
<ol>
<li>
<p>实验页面上方显示实验名称，右上角有一个全屏按钮和折叠按钮，VS Code 环境下默认收起折叠框，点击折叠框可以看到更多功能可以选择</p>
</li>
<li>
<p>此时在项目目录下可以看到一个数据集文件夹，这里的数据集文件和数据集平台中的数据时同步的，为了尽可能节省用户存储空间，项目目录中的数据集文件采用网盘挂载的方式引入实验环境中，只有在实际访问具体数据文件时，数据才会被拷贝到目录中。</p>
</li>
<li>
<p>数据集菜单中提供数据集文档查看、数据集平台跳转等功能</p>
</li>
</ol>
<p><img src="@source/Project/imgs/experimental-platform/数据集查看.jpg" alt="数据集查看"></p>
<h4 id="模型部署相关功能" tabindex="-1"><a class="header-anchor" href="#模型部署相关功能" aria-hidden="true">#</a> 模型部署相关功能</h4>
<ol>
<li>
<p>实验过程中可能会出现需要安装当前环境下缺少的库，在实验环境下通过<code>pip </code>下载库时，需要点击保存实验环境，这样在下次进入实验时就不需要进行重复下载，另外保存实验实际上相当于制作了一个单独的私有镜像，也可以在私有镜像管理中进行管理。</p>
</li>
<li>
<p>模型部署主要提供云端和边缘端部署，所谓云端部署即是将训练好的模型部署到云端服务器上，部署成功后服务器会返回一个 url 链接，此时，用户就可以通过请求该 url 使用模型进行预测；边缘端部署是将模型部署到物联网设备中，在实验页面下部署模型后，可以在模型库平台中看到部署的服务，然后在平台上进行后续配置即可使用模型。</p>
</li>
</ol>
<p><img src="@source/Project/imgs/experimental-platform/模型部署.jpg" alt="模型部署"></p>
<h4 id="代码助手" tabindex="-1"><a class="header-anchor" href="#代码助手" aria-hidden="true">#</a> 代码助手</h4>
<ol>
<li>代码助手功能，通过调用 chatbot API 实现的代码助手，可以在实验过程中为我们提供不小的帮助，通过对话的形式解决实验过程中的问题。</li>
</ol>
<p><img src="@source/Project/imgs/experimental-platform/代码助手.png" alt="代码助手"></p>
<h3 id="分享实验" tabindex="-1"><a class="header-anchor" href="#分享实验" aria-hidden="true">#</a> 分享实验</h3>
<ol>
<li>
<p>在进行自主实验时，如何复现其他人已完成的实验。实验平台提供的分享实验功能就是为了解决这一应用场景而诞生的，点击右上角分享实验按钮后，其他用户即可在自主实验列表下，通过选择模板创建实验的方式查看已分享且通过审核的实验，通过该方式创建的实验即可完美复现模板中的实验</p>
</li>
<li>
<p>已分享的实验可以在实验页面下看到已分享的字样</p>
</li>
</ol>
<p><img src="@source/Project/imgs/experimental-platform/分享实验.jpg" alt="分享实验"></p>
<h3 id="私有镜像" tabindex="-1"><a class="header-anchor" href="#私有镜像" aria-hidden="true">#</a> 私有镜像</h3>
<ul>
<li>私有镜像的制作
<ul>
<li>在私有镜像菜单中可以查看当前账号下制作的私有镜像</li>
<li>制作私有镜像需要完成两项配置
<ul>
<li>基础镜像：选择公开镜像</li>
<li>依赖：根据需要的环境下载对应的依赖，依赖列表对应 pypi 库中的各个模块</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/制作私有镜像.jpg" alt="私有镜像的制作"></p>
<h3 id="任务汇报" tabindex="-1"><a class="header-anchor" href="#任务汇报" aria-hidden="true">#</a> 任务汇报</h3>
<p>针对老师下发的任务，学生在登录账号后进入我的任务中查看任务详情并进行进度汇报</p>
<ul>
<li>我的任务列表
<ul>
<li>其中包含任务所属课题以及任务的开始和截止时间</li>
<li>同时也可以看到汇报进度条，同时可以查看已完成的任务</li>
<li>处于待审核状态的任务指的是学生在汇报时进度提交为 100%，此时需要老师进行任务审核，待审核通过后任务才会处于已完成状态，若审核不通过，需要继续当前任务</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/我的任务.jpg" alt="我的任务"></p>
<ul>
<li>任务汇报
<ul>
<li>在任务汇报页中进行任务汇报，同时对于学生提交的历史汇报老师在查看时可以给予对应的回复</li>
<li>点击右上角消息图标进入公开交流页进行问题讨论</li>
<li>处于待审核状态的任务指的是学生在汇报时进度提交为 100%，此时需要老师进行任务审核，待审核通过后任务才会处于已完成状态，若审核不通过，需要继续当前任务</li>
</ul>
</li>
</ul>
<p><img src="@source/Project/imgs/experimental-platform/任务汇报.jpg" alt="任务汇报"></p>
<h2 id="问题反馈" tabindex="-1"><a class="header-anchor" href="#问题反馈" aria-hidden="true">#</a> 问题反馈</h2>
<p>若在使用平台的过程中有任何问题、优化建议或者有特殊镜像需求，点击账号左侧问题反馈按钮进行反馈，此处提交的问题或建议会得到即时处理。</p>
<p><img src="@source/Project/imgs/experimental-platform/问题反馈.jpg" alt="问题反馈"></p>
</template>

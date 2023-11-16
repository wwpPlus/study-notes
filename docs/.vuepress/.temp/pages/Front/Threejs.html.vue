<template><h1 id="three-js" tabindex="-1"><a class="header-anchor" href="#three-js" aria-hidden="true">#</a> Three.js</h1>
<h2 id="练习案例" tabindex="-1"><a class="header-anchor" href="#练习案例" aria-hidden="true">#</a> 练习案例</h2>
<p><a href="https://gitee.com/star_wwp/threejs-practice-case" target="_blank" rel="noopener noreferrer">练习案例<ExternalLinkIcon/></a></p>
<h2 id="基础" tabindex="-1"><a class="header-anchor" href="#基础" aria-hidden="true">#</a> 基础</h2>
<h3 id="three-js应用结构" tabindex="-1"><a class="header-anchor" href="#three-js应用结构" aria-hidden="true">#</a> three.js应用结构</h3>
<p><img src="imgs/threejs/three.js struct.jpg" alt="图片"></p>
<ul>
<li>Renderer：three.js的主要对象。它会将摄像机视椎体中的三维场景渲染成一个二维图片显示在画布上。</li>
<li>Scene：定义场景图最基本的要素，并包含了背景色和雾等属性。这些对象通过一个层级关系明确的树状结构来展示出各自的位置和方向。子对象的位置和方向总是相对于父对象而言的。</li>
<li>Camera：不一定要在场景图中才能起作用。</li>
<li>Mesh：用Geometry和 Material绘制图像。</li>
<li>Geometry：几何体，存放几何体的顶点信息。</li>
<li>Material：几何体的表面属性，包括使用的颜色，和光亮程度。</li>
<li>Texture：应用到几何体表面。</li>
<li>Light：不同种类的光。</li>
</ul>
<h3 id="基本使用流程" tabindex="-1"><a class="header-anchor" href="#基本使用流程" aria-hidden="true">#</a> 基本使用流程</h3>
<p>基本流程：</p>
<ol>
<li>创建一个场景</li>
</ol>
<p>用于放置物体、灯光和摄像机
2. 创建一个摄像机
<code>const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);</code>
<img src="imgs/threejs/camera init.jpg" alt="图片"></p>
<ul>
<li>fov：视野范围。</li>
<li>aspect：画布的宽高比。</li>
<li>near和far代表近平面和远平面，它们限制了摄像机面朝方向的可绘区域。 任何距离小于或超过这个范围的物体都将被裁剪掉(不绘制)。</li>
</ul>
<blockquote>
<p>这四个参数定义了一个 &quot;视椎(frustum)&quot;。 视椎(frustum)是指一个像被削去顶部的金字塔形状。</p>
</blockquote>
<p>可以借助position属性调节摄像机的位置<code>camera.position.z = 2</code>
<img src="imgs/threejs/camer position.jpg" alt="图片">
3. 创建一个渲染器</p>
<p>渲染器负责将提供的所有数据渲染绘制到页面上。
4. 创建场景中的各部分</p>
<p>创建网格(Mesh)对象，其中包含几何体(Geometry)(物体的形状)、材质(Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
5. 将网格(Mesh)放到场景中，最后进行渲染展示</p>
<p>基础样例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// create a scene, that will hold all our elements such as objects, cameras and lights.</span>
<span class="token keyword">var</span> scene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create a camera, which defines where we're looking at.</span>
<span class="token keyword">var</span> camera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span><span class="token number">45</span><span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerWidth <span class="token operator">/</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">,</span> <span class="token number">0.1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create a render and set the size</span>
<span class="token keyword">var</span> renderer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">setClearColorHex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">setClearColor</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Color</span><span class="token punctuation">(</span><span class="token number">0xEEEEEE</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">setSize</span><span class="token punctuation">(</span>window<span class="token punctuation">.</span>innerWidth<span class="token punctuation">,</span> window<span class="token punctuation">.</span>innerHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// show axes in the screen</span>
<span class="token keyword">var</span> axes <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>AxisHelper</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>axes<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create the ground plane</span>
<span class="token keyword">var</span> planeGeometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PlaneGeometry</span><span class="token punctuation">(</span><span class="token number">60</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> planeMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token number">0x707070</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> plane <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>planeGeometry<span class="token punctuation">,</span> planeMaterial<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// rotate and position the plane</span>
plane<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">0.5</span> <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token constant">PI</span><span class="token punctuation">;</span>
plane<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">15</span><span class="token punctuation">;</span>
plane<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
plane<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// add the plane to the scene</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>plane<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create a cube</span>
<span class="token keyword">var</span> cubeGeometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BoxGeometry</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cubeMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshPhongMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token number">0x44aa88</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> cube <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>cubeGeometry<span class="token punctuation">,</span> cubeMaterial<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// position the cube</span>
cube<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">4</span><span class="token punctuation">;</span>
cube<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
cube<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

<span class="token comment">// add the cube to the scene</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cube<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// create a sphere</span>
<span class="token keyword">var</span> sphereGeometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>SphereGeometry</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> sphereMaterial <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshBasicMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token number">0x7777ff</span><span class="token punctuation">,</span> <span class="token literal-property property">wireframe</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> sphere <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Mesh</span><span class="token punctuation">(</span>sphereGeometry<span class="token punctuation">,</span> sphereMaterial<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// position the sphere</span>
sphere<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
sphere<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
sphere<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>

<span class="token comment">// add the sphere to the scene</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>sphere<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// position and point the camera to the center of the scene</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>x <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">30</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>y <span class="token operator">=</span> <span class="token number">40</span><span class="token punctuation">;</span>
camera<span class="token punctuation">.</span>position<span class="token punctuation">.</span>z <span class="token operator">=</span> <span class="token number">30</span><span class="token punctuation">;</span>
<span class="token comment">// camera.up.x = 10;</span>
<span class="token comment">// camera.up.y = 10;</span>
<span class="token comment">// camera.up.z = 10;</span>
camera<span class="token punctuation">.</span><span class="token function">lookAt</span><span class="token punctuation">(</span>scene<span class="token punctuation">.</span>position<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// add the output of the renderer to the html element</span>
document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"WebGL-output"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendChild</span><span class="token punctuation">(</span>renderer<span class="token punctuation">.</span>domElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// add the light</span>
<span class="token keyword">const</span> color <span class="token operator">=</span> <span class="token number">0xFFFFFF</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> intensity <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> light <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>DirectionalLight</span><span class="token punctuation">(</span>color<span class="token punctuation">,</span> intensity<span class="token punctuation">)</span><span class="token punctuation">;</span>
light<span class="token punctuation">.</span>position<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
scene<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>light<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// requestAnimationFrame 动画旋转</span>
<span class="token keyword">var</span> <span class="token function-variable function">durationRender</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">time</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        time <span class="token operator">*=</span> <span class="token number">0.001</span><span class="token punctuation">;</span>  <span class="token comment">// 将时间单位变为秒</span>
        sphere<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x<span class="token operator">=</span> time<span class="token punctuation">;</span>
        sphere<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> time<span class="token punctuation">;</span>
        cube<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>x <span class="token operator">=</span> time<span class="token punctuation">;</span>
        cube<span class="token punctuation">.</span>rotation<span class="token punctuation">.</span>y <span class="token operator">=</span> time<span class="token punctuation">;</span>
        renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>    
        <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>durationRender<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// render the scene</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>durationRender<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br></div></div><p><img src="imgs/threejs/demo1.jpg" alt="图片"></p>
<blockquote>
<p>lookAt 函数让摄像机从它的位置“看向”我们传递 lookAt 的位置。
渲染循环函数 requestAnimationFrame：可以使几何体进行旋转，requestAnimationFrame函数会告诉浏览器需要显示动画。传入一个函数作为回调函数。
MeshBasicMaterial材质不会受到灯光的影响。将他改成会受灯光影响的MeshPhongMaterial材质。添加灯光。
AxesHelper 。它画了 3 条线，分别代表本地的 X， Y， 以及 Z轴。</p>
</blockquote>
<h2 id="图元" tabindex="-1"><a class="header-anchor" href="#图元" aria-hidden="true">#</a> 图元</h2>
<p>图元就是一些 3D 的形状，在运行时根据大量参数生成。
官网案例（参数可调）：<strong><a href="https://threejs.org/manual/#zh/primitives" target="_blank" rel="noopener noreferrer">https://threejs.org/manual/#zh/primitives<ExternalLinkIcon/></a></strong></p>
<h2 id="场景图" tabindex="-1"><a class="header-anchor" href="#场景图" aria-hidden="true">#</a> 场景图</h2>
<p>场景图在 3D 引擎是一个图中节点的层次结构，其中每个节点代表了一个局部空间。</p>
<p><strong>节点中的元素只需要关注自身围绕这个局部空间的操作。</strong></p>
<p>复杂场景图（太阳、地球、月球自转系统）的层次结构：
<img src="imgs/threejs/scene hierarchical.jpg" alt="图片"></p>
<h2 id="材质" tabindex="-1"><a class="header-anchor" href="#材质" aria-hidden="true">#</a> 材质</h2>
<p>材质定义了对象在场景中的外型。</p>
<table>
<thead>
<tr>
<th>材质</th>
<th>特点</th>
</tr>
</thead>
<tbody>
<tr>
<td>MeshBasicMaterial</td>
<td>不受光照的影响。</td>
</tr>
<tr>
<td>MeshLambertMaterial</td>
<td>只在顶点计算光照</td>
</tr>
<tr>
<td>MeshPhongMaterial</td>
<td>则在每个像素计算光照，支持镜面高光。</td>
</tr>
<tr>
<td>ShadowMaterial</td>
<td>用于获取阴影创建的数据。</td>
</tr>
<tr>
<td>MeshDepthMaterial</td>
<td>渲染每个像素的深度。</td>
</tr>
<tr>
<td>MeshNormalMaterial</td>
<td>会显示几何体的法线。</td>
</tr>
</tbody>
</table>
<blockquote>
<p>各种标准材质的构建速度从最快到最慢：MeshBasicMaterial ➡ MeshLambertMaterial ➡ MeshPhongMaterial ➡ MeshStandardMaterial ➡ MeshPhysicalMaterial</p>
</blockquote>
<h2 id="纹理" tabindex="-1"><a class="header-anchor" href="#纹理" aria-hidden="true">#</a> 纹理</h2>
<p>在three.js中，当纹理绘制的尺寸大于其原始尺寸时，或者绘制的尺寸小于其原始尺寸时，可以使用过滤和mips处理纹理</p>
<p>为了在绘制的纹理小于其原始尺寸时设置过滤器，可以将 texture.minFilter 属性设置为下面6个值之一。</p>
<table>
<thead>
<tr>
<th>属性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>THREE.NearestFilter</td>
<td>同上，在纹理中选择最近的像素。</td>
</tr>
<tr>
<td>THREE.LinearFilter</td>
<td>和上面一样，从纹理中选择4个像素，然后混合它们</td>
</tr>
<tr>
<td>THREE.NearestMipmapNearestFilter</td>
<td>选择合适的mip，然后选择一个像素。</td>
</tr>
<tr>
<td>THREE.NearestMipmapLinearFilter</td>
<td>选择2个mips，从每个mips中选择一个像素，混合这2个像素。</td>
</tr>
<tr>
<td>THREE.LinearMipmapNearestFilter</td>
<td>选择合适的mip，然后选择4个像素并将它们混合。</td>
</tr>
<tr>
<td>THREE.LinearMipmapLinearFilter</td>
<td>选择2个mips，从每个mips中选择4个像素，然后将所有8个像素混合成1个像素。</td>
</tr>
</tbody>
</table>
<p>纹理有重复、偏移和旋转纹理的设置。</p>
<ul>
<li>重复：wrapS 用于水平包裹，wrapT 用于垂直包裹。</li>
<li>偏移：offset，1个单位=1个纹理大小</li>
<li>旋转：rotation，center用于选择旋转中心，默认值是0,0，从左下角开始旋转</li>
</ul>
<table>
<thead>
<tr>
<th>属性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>THREE.ClampToEdgeWrapping</td>
<td>每条边上的最后一个像素无限重复。</td>
</tr>
<tr>
<td>THREE.RepeatWrapping</td>
<td>纹理重复</td>
</tr>
<tr>
<td>THREE.MirroredRepeatWrapping</td>
<td>在每次重复时将进行镜像</td>
</tr>
</tbody>
</table>
<h2 id="光照" tabindex="-1"><a class="header-anchor" href="#光照" aria-hidden="true">#</a> 光照</h2>
<p>OrbitControls 让我们可以围绕某一个点旋转控制相机</p>
<table>
<thead>
<tr>
<th>灯光</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>环境光 （AmbientLight）</td>
<td>只是简单地将材质的颜色与光照颜色进行叠加。通常的作用是提亮场景，让暗部不要太暗。</td>
</tr>
<tr>
<td>半球光（HemisphereLight）</td>
<td>的颜色是从天空到地面两个颜色之间的渐变，与物体材质的颜色作叠加后得到最终的颜色效果。</td>
</tr>
<tr>
<td>方向光（DirectionalLight）</td>
<td>常常用来表现太阳光照的效果。需要设置灯光的位置和target照向目标点的位置。</td>
</tr>
<tr>
<td>点光源（PointLight）</td>
<td>表示的是从一个点朝各个方向发射出光线的一种光照效果。</td>
</tr>
<tr>
<td>聚光灯（SpotLight）</td>
<td>可以看成是一个点光源被一个圆锥体限制住了光照的范围。</td>
</tr>
<tr>
<td>矩形区域光（RectAreaLight）</td>
<td>表示一个矩形区域的发射出来的光照。</td>
</tr>
</tbody>
</table>
<blockquote>
<p>WebGLRenderer 中有一个设置项 physicallyCorrectLights。这个设置会影响（随着离光源的距离增加）光照如何减弱。这个设置会影响点光源（PointLight）和聚光灯（SpotLight），矩形区域光（RectAreaLight）会自动应用这个特性。</p>
<p>在设置光照时，基本思路是不要设置 distance 来表现光照的衰减，也不要设置 intensity。而是设置光照的 power 属性，以流明为单位，three.js 会进行物理计算，从而表现出接近真实的光照效果。</p>
</blockquote>
<h2 id="摄像机" tabindex="-1"><a class="header-anchor" href="#摄像机" aria-hidden="true">#</a> 摄像机</h2>
<ul>
<li>
<p>PerspectiveCamera通过四个属性来定义一个视锥。near定义了视锥的前端，far定义了后端，fov是视野，通过计算正确的高度来从摄像机的位置获得指定的以near为单位的视野，定义的是视锥的前端和后端的高度。aspect间接地定义了视锥前端和后端的宽度，实际上视锥的宽度是通过高度乘以 aspect 来得到的。</p>
</li>
<li>
<p>正交摄像机 OrthographicCamera，和指定一个视锥不同的是，它需要设置left，right top，bottom，near，和far指定一个长方体，使得视野是平行的而不是透视的。可以用来展示模型的三视图</p>
</li>
</ul>
<h2 id="阴影" tabindex="-1"><a class="header-anchor" href="#阴影" aria-hidden="true">#</a> 阴影</h2>
<p>Three.js 默认使用shadow maps（阴影贴图），阴影贴图的工作方式就是具有投射阴影的光能对所有能被投射阴影的物体从光源渲染阴影。</p>
<h2 id="雾" tabindex="-1"><a class="header-anchor" href="#雾" aria-hidden="true">#</a> 雾</h2>
<p>在3D引擎里，雾通常是基于离摄像机的距离褪色至某种特定颜色的方式。在three.js中添加雾是通过创建 Fog 或者 FogExp2 实例并设定scene的fog 属性。</p>
<p>fog 在材料上有个布尔属性，用来设置渲染物体的材料是否会受到雾的影响。</p>
<p><code>scene.fog = new THREE.Fog(color, near, far);</code>near 数值大于 far 是无效的</p>
<blockquote>
<p>需要注意的是雾是作用在 <em>渲染的物体</em> 上的，是物体颜色中每个像素计算的一部分。这意味着如果你想让你的场景褪色到某种颜色，你需要设定雾 和 场景的背景颜色为同一种颜色。</p>
</blockquote>
<h2 id="渲染目标" tabindex="-1"><a class="header-anchor" href="#渲染目标" aria-hidden="true">#</a> 渲染目标</h2>
<p>在three.js中，渲染目标大体上指的是可以被渲染的纹理。当它被渲染之后，可以像使用其他纹理一样使用它。</p>
<p>默认情况下 WebGLRenderTarget 会创建两个纹理。 颜色纹理（stencilBuffer）和深度/模版纹理（depthBuffer）。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderTarget <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>WebGLRenderTarget</span><span class="token punctuation">(</span>rtWidth<span class="token punctuation">,</span> rtHeight<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> rtCamera <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>PerspectiveCamera</span><span class="token punctuation">(</span>rtFov<span class="token punctuation">,</span> rtAspect<span class="token punctuation">,</span> rtNear<span class="token punctuation">,</span> rtFar<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> rtScene <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>Scene</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 添加使用了渲染目标纹理的方块。</span>
<span class="token keyword">const</span> material <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>MeshPhongMaterial</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">map</span><span class="token operator">:</span> renderTarget<span class="token punctuation">.</span>texture<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">setRenderTarget</span><span class="token punctuation">(</span>renderTarget<span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>rtScene<span class="token punctuation">,</span> rtCamera<span class="token punctuation">)</span><span class="token punctuation">;</span>
renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="自定义缓冲几何体" tabindex="-1"><a class="header-anchor" href="#自定义缓冲几何体" aria-hidden="true">#</a> 自定义缓冲几何体</h2>
<p>BufferGeometry 是用来代表所有几何体的一种方式。 BufferGeometry 本质上是一系列 BufferAttributes 的 名称 。每一个 BufferAttribute 代表一种类型数据的数组：位置，法线，颜色，uv，等等…… 这些合起来， BufferAttributes 代表每个顶点所有数据的 并行数组 。</p>
<p>使用案例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> vertices <span class="token operator">=</span> <span class="token punctuation">[</span>
 <span class="token comment">// front</span>
 <span class="token punctuation">{</span> <span class="token literal-property property">pos</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">norm</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token literal-property property">uv</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token comment">// 0</span>
 <span class="token comment">// right、back、left、top、bottom</span>
 <span class="token operator">...</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> positions <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> normals <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> uvs <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> vertex <span class="token keyword">of</span> vertices<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 positions<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>vertex<span class="token punctuation">.</span>pos<span class="token punctuation">)</span><span class="token punctuation">;</span>
 normals<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>vertex<span class="token punctuation">.</span>norm<span class="token punctuation">)</span><span class="token punctuation">;</span>
 uvs<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token operator">...</span>vertex<span class="token punctuation">.</span>uv<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> geometry <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferGeometry</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> positionNumComponents <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> normalNumComponents <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> uvNumComponents <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
geometry<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
   <span class="token string">'position'</span><span class="token punctuation">,</span>
   <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferAttribute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>positions<span class="token punctuation">)</span><span class="token punctuation">,</span> positionNumComponents<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
geometry<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
   <span class="token string">'normal'</span><span class="token punctuation">,</span>
   <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferAttribute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>normals<span class="token punctuation">)</span><span class="token punctuation">,</span> normalNumComponents<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
geometry<span class="token punctuation">.</span><span class="token function">setAttribute</span><span class="token punctuation">(</span>
   <span class="token string">'uv'</span><span class="token punctuation">,</span>
   <span class="token keyword">new</span> <span class="token class-name">THREE<span class="token punctuation">.</span>BufferAttribute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Float32Array</span><span class="token punctuation">(</span>uvs<span class="token punctuation">)</span><span class="token punctuation">,</span> uvNumComponents<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
geometry<span class="token punctuation">.</span><span class="token function">setIndex</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
  <span class="token number">0</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">2</span><span class="token punctuation">,</span>   <span class="token number">2</span><span class="token punctuation">,</span>  <span class="token number">1</span><span class="token punctuation">,</span>  <span class="token number">3</span><span class="token punctuation">,</span>  <span class="token comment">// front</span>
 <span class="token comment">// right、back、left、top、bottom</span>
 <span class="token operator">...</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><ul>
<li>BufferAttribute 是类型数组而不是原生数组。同时 BufferAttribute 需要你设定每个顶点有多少组成成分。对于位置和法线，每个顶点我们需要3个组成成分，x、y和z。对于UVs我们需要2个，u和v。</li>
<li>如果没有提供法线数据的话， BufferGeometry 有个方法computeVertexNormals可以用来计算法线。</li>
<li>通过调用 BufferGeometry.setIndex 并传入索引数组来创建图形可以避免使用重复参数。</li>
<li>positionAttribute.setUsage(THREE.DynamicDrawUsage)：标记位置属性为动态。这是提示THREE.js我们将会经常改变属性的内容。positionAttribute.needsUpdate = true; 使THREE.js响应属性的改变。</li>
</ul>
<h2 id="设计技巧" tabindex="-1"><a class="header-anchor" href="#设计技巧" aria-hidden="true">#</a> 设计技巧</h2>
<h3 id="按需渲染" tabindex="-1"><a class="header-anchor" href="#按需渲染" aria-hidden="true">#</a> 按需渲染</h3>
<p>requestAnimationFrame循环或者写成rAF loop进行连续渲染</p>
<p>针对不需要连续渲染的场景：例如</p>
<ul>
<li>移动摄像机时渲染OrbitControls提供了一个change事件来监听变化<code>controls.addEventListener('change', render);</code></li>
<li>在需要一个新帧的时候才执行</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> renderRequested <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  renderRequested <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">resizeRendererToDisplaySize</span><span class="token punctuation">(</span>renderer<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> canvas <span class="token operator">=</span> renderer<span class="token punctuation">.</span>domElement<span class="token punctuation">;</span>
    camera<span class="token punctuation">.</span>aspect <span class="token operator">=</span> canvas<span class="token punctuation">.</span>clientWidth <span class="token operator">/</span> canvas<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
    camera<span class="token punctuation">.</span><span class="token function">updateProjectionMatrix</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  renderer<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>scene<span class="token punctuation">,</span> camera<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 增加某种惯性避免change事件进入死循环做法：需要一个新帧的时候才执行</span>
<span class="token keyword">function</span> <span class="token function">requestRenderIfNotRequested</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>renderRequested<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    renderRequested <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span>render<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// controls.addEventListener('change', render);</span>
controls<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'change'</span><span class="token punctuation">,</span> requestRenderIfNotRequested<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h3 id="canvas截图" tabindex="-1"><a class="header-anchor" href="#canvas截图" aria-hidden="true">#</a> canvas截图</h3>
<p>canvas.toBlob
基于性能和兼容性的考量，默认情况下浏览器会在绘制完成后清除WebGL canvas的缓存。导致截到的是一张纯黑的图片。</p>
<p>解决方案</p>
<ul>
<li>在捕获截图前调用一次渲染代码。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
canvas<span class="token punctuation">.</span><span class="token function">toBlob</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">blob</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token function">saveBlob</span><span class="token punctuation">(</span>blob<span class="token punctuation">,</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">screencapture-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>canvas<span class="token punctuation">.</span>width<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">x</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>canvas<span class="token punctuation">.</span>height<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">.png</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ul>
<li>创建WebGLRenderer时传入 preserveDrawingBuffer: true。这将阻止浏览器清理canvas。类似的，也需要告诉three.js不要自动清理canvas。</li>
</ul>
<h3 id="获取键盘输入" tabindex="-1"><a class="header-anchor" href="#获取键盘输入" aria-hidden="true">#</a> 获取键盘输入</h3>
<p>通常会将事件监听器绑定到canvas上。 虽然许多事件都能生效，但是默认情况下键盘事件不会正常响应。为了获取键盘事件，我们将canvas的 tabindex 属性设置为0或更高。
这将导致一个新的问题，任何设置了 tabindex 的元素会在聚焦的时候突出显示。为了解决这个问题，我们在CSS中将它focus状态下的outline属性设置为none</p>
<h3 id="透明化canvas" tabindex="-1"><a class="header-anchor" href="#透明化canvas" aria-hidden="true">#</a> 透明化canvas</h3>
<p>需要让canvas变得透明可以在创建 WebGLRenderer 的时候传入 alpha:true</p>
<h3 id="使用three-js动画作为背景" tabindex="-1"><a class="header-anchor" href="#使用three-js动画作为背景" aria-hidden="true">#</a> 使用three.js动画作为背景</h3>
<p>一个常见的问题是如何使用three.js动画作为网站的背景。
这有两种显而易见的方法：</p>
<ol>
<li>
<p>将canvas的CSS position 属性如下设置为 fixed，只需要将 z-index 设为 -1 就可以看到立方体们显示到文字后面。</p>
</li>
<li>
<p>使用 iframe，然后修改样式使其填满窗口，并且处于背景中，因为iframe存在默认边框，需要额外将 border 设为 none 。</p>
</li>
</ol>
<h2 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h2>
<h3 id="大量对象的优化" tabindex="-1"><a class="header-anchor" href="#大量对象的优化" aria-hidden="true">#</a> 大量对象的优化</h3>
<ul>
<li>合并几何体：一次画多个</li>
<li>优化对象的同时保持动画效果：变形目标morphtargets是一种给每个顶点提供多个值, 以及使他们进行变形或者说lerp(线性插值)的方法，给每一个数据集做一个几何体, 可以提取属性, 把他们作为morphtargets。</li>
</ul>
<h3 id="离屏渲染" tabindex="-1"><a class="header-anchor" href="#离屏渲染" aria-hidden="true">#</a> 离屏渲染</h3>
<p>目前仅在Chrome可用，允许使用Web Worker去渲染画布，避免减慢浏览器的响应速度。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#c'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>canvas<span class="token punctuation">.</span>transferControlToOffscreen<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  canvas<span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">'none'</span><span class="token punctuation">;</span>
  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#noOffscreenCanvas'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>style<span class="token punctuation">.</span>display <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> offscreen <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">transferControlToOffscreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> worker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Worker</span><span class="token punctuation">(</span><span class="token string">'offscreencanvas-picking.js'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'module'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
worker<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'main'</span><span class="token punctuation">,</span> <span class="token literal-property property">canvas</span><span class="token operator">:</span> offscreen<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>offscreen<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><a href="https://threejs.org/manual/zh/offscreencanvas.html" target="_blank" rel="noopener noreferrer">案例<ExternalLinkIcon/></a></p>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<ul>
<li><a href="https://threejs.org/manual/#zh/load-obj" target="_blank" rel="noopener noreferrer">加载 .OBJ 文件<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/load-gltf" target="_blank" rel="noopener noreferrer">加载 .GLTF 文件<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/backgrounds" target="_blank" rel="noopener noreferrer">添加背景或天空盒<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/transparency" target="_blank" rel="noopener noreferrer">如何绘制透明的物体<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/multiple-scenes" target="_blank" rel="noopener noreferrer">多个画布, 多个场景<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/picking" target="_blank" rel="noopener noreferrer">鼠标选取对象<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/post-processing" target="_blank" rel="noopener noreferrer">后期处理<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/align-html-elements-to-3d" target="_blank" rel="noopener noreferrer">对齐HTML元素到3D对象<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/indexed-textures" target="_blank" rel="noopener noreferrer">使用纹理索引来拾取和着色<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/canvas-textures" target="_blank" rel="noopener noreferrer">使用Canvas生成动态纹理<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/billboards" target="_blank" rel="noopener noreferrer">广告牌(Billboards)<ExternalLinkIcon/></a></li>
<li><a href="https://threejs.org/manual/#zh/cleanup" target="_blank" rel="noopener noreferrer">释放资源<ExternalLinkIcon/></a></li>
</ul>
</template>

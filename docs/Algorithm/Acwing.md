# AcWing 算法学习

## 算法基础

- 基础算法：包括排序、二分、高精度、前缀和与差分、双指针算法、位运算、离散化、区间合并等内容。
- 数据结构：包括单链表，双链表，栈，队列，单调栈，单调队列，KMP，Trie，并查集，堆，哈希表等内容。
- 搜索与图论：包括DFS，BFS，树与图的深度优先遍历，树与图的广度优先遍历，拓扑排序，Dijkstra，bellman-ford，spfa，Floyd，Prim，Kruskal，染色法判定二分图，匈牙利算法等内容。
- 数学知识：包括质数，约数，欧拉函数，快速幂，扩展欧几里得算法，中国剩余定理，高斯消元，求组合数，容斥原理，博弈论等内容。
- 动态规划：包括背包问题，线性DP，区间DP，计数类DP，数位统计DP，状态压缩DP，树形DP，记忆化搜索等内容。
- 贪心：包括区间问题，Huffman树，排序不等式，绝对值不等式，推公式等内容。

## 基础算法

排序、二分、高精度、前缀和与差分、双指针算法、位运算、离散化、区间合并

### 快速排序

#### 快速排序

```java
import java.util.*;
public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] q = new int[n];
        for(int i = 0; i < n; i ++){
            q[i] = sc.nextInt();
        }
        quick_sort(0, n - 1, q);
        for(int i = 0; i < n; i ++){
            System.out.print(q[i] + " ");
        }
    }
    static void quick_sort(int l, int r, int[] q){
        if(l >= r){
            return;
        }
        int x = q[l + r >> 1], i = l - 1, j = r + 1;
        while(i < j){
            while(q[++i] < x);
            while(q[--j] > x);
            if(i < j){
                int t = q[i];
                q[i] = q[j];
                q[j] = t;
            }
        }
        quick_sort(l, j, q);
        quick_sort(j + 1, r, q);
    }
}
```

#### 第k个数

给定一个长度为 n 的整数数列，以及一个整数 k，请用快速选择算法求出数列从小到大排序后的第 k 个数。

```java
import java.util.*;
public class Main{
    static int[] q = new int[100010];
    static int n, k;
    static int quick_sort(int l, int r, int k){
        if(l == r) return q[l];
        int i = l - 1, j = r + 1, x = q[l + r >> 1];
        while(i < j){
            while(q[++ i] < x);
            while(q[-- j] > x);
            if(i < j){
                int t = q[i];
                q[i] = q[j];
                q[j] = t;
            }
        }
        int sl = j - l + 1;
        if(k <= sl){
            return quick_sort(l, j, k);
        }
        return quick_sort(j + 1, r, k - sl);
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();
        k = sc.nextInt();
        for(int i = 0; i < n; i ++) q[i] = sc.nextInt();
        int res = quick_sort(0, n - 1, k);
        System.out.println(res);
    }
}
```

#### 归并排序

```java
import java.util.*;
public class Main{
    static void merge_sort(int l, int r, int[] q, int[] temp){
        if(l < r){
            int mid = l + r >> 1;
            merge_sort(l, mid, q, temp);
            merge_sort(mid + 1, r, q, temp);
            merge(l, r, q, temp);
        }
    }
    static void merge(int l, int r, int[] q, int[] temp){
        int mid = l + r >> 1, i = l, j = mid + 1, k = 0;
        while(i <= mid && j <= r){
            if(q[i] < q[j]) temp[k ++] = q[i ++];
            else temp[k ++] = q[j ++];
        }
        while(i <= mid) temp[k ++] = q[i ++];
        while(j <= r) temp[k ++] = q[j ++];
        for(i = 0; i < k; i ++){
            q[l + i] = temp[i];
        }
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] q = new int[n];
        int[] temp = new int[n];
        for(int i = 0; i < n; i ++){
            q[i] = sc.nextInt();
        }
        merge_sort(0, n - 1, q, temp);
        for(int i = 0; i < n; i ++){
            System.out.print(q[i] + " ");
        }
    }
}
```

#### 逆序对的数量

给定一个长度为 n 的整数数列，请你计算数列中的逆序对的数量。

逆序对的定义如下：对于数列的第 i 个和第 j 个元素，如果满足 i<j 且 a[i]>a[j]，则其为一个逆序对；否则不是。

```java
import java.io.*;
public class Main{
    static int N = 100000 + 6;
    static int[] q = new int[N];
    static int[] temp = new int[N];
    static long ans = 0L;
    static void merge_sort(int l, int r){
        if(l >= r) return;
        int mid = l + r >> 1;
        merge_sort(l, mid);
        merge_sort(mid + 1, r);
        
        mid = l + r >> 1;
        int k = 0, i = l, j = mid + 1;
        while(i <= mid && j <= r){
            if(q[i] > q[j]){
                ans += mid - i + 1;
                temp[k ++] = q[j ++];
            }else temp[k ++] = q[i ++];
        }
        while(i <= mid) temp[k ++] = q[i ++];
        while(j <= r) temp[k ++] = q[j ++];
        for(i = 0; i < k; i ++){
            q[l + i] = temp[i];
        }
    }
    public static void main(String[] args) throws IOException{
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(in.readLine());
        String[] arr = in.readLine().split(" ");
        for(int i = 0; i < n; i ++){
            q[i] = Integer.parseInt(arr[i]);
        }
        merge_sort(0, n - 1);
        System.out.print(ans);
    }
}
```

### 二分算法

#### 数的范围

给定一个按照升序排列的长度为 n 的整数数组，以及 q 个查询。

对于每个查询，返回一个元素 k 的起始位置和终止位置（位置从 0 开始计数）。
如果数组中不存在该元素，则返回 `-1 -1`。

```java
import java.util.*;
public class Main{
    static int n, q, k;
    static int[] a = new int[100010];
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        n = sc.nextInt();
        q = sc.nextInt();
        for(int i = 0; i < n; i ++){
            a[i] = sc.nextInt();
        }
        while(q -- > 0){
            k = sc.nextInt();
            int l = 0, r = n - 1, mid;
            while(l < r){
                mid = l + r >> 1;
                if(a[mid] < k) l = mid + 1;
                else r = mid;
            }
            if(a[l] == k){
                System.out.print(l + " ");
            }else {
                System.out.println("-1 -1");
                continue;
            }
            l = 0;
            r = n - 1;
            while(l < r){
                mid = l + r + 1 >> 1;
                if(a[mid] > k) r = mid - 1;
                else l = mid;
            }
            System.out.print(r + "\n");
        }
    }
}
```

#### 数的三次方根

给定一个浮点数 n ，求它的三次方根。

```java
import java.util.*;
public class Main{
    static double n;
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        double l = -1e5D, r = 1e5D, mid = (l + r) / 2;
        double x = sc.nextDouble();
        while(r - l > 1e-8){
            mid = (l + r) / 2;
            double tx = Math.pow(mid, 3);
            if(tx > x) r = mid;
            else l = mid;
        }
        System.out.println(String.format("%.6f", mid));
    }
}
```

### 高精度算法

数据范围
`1≤整数长度≤100000`

#### 高精度加法

给定两个正整数（不含前导 0 ），计算它们的和。

```java
import java.util.*;
import java.io.*;
public class Main{
    static List<Integer> add(List<Integer> A, List<Integer> B){
        List<Integer> C = new ArrayList<>();
        int t = 0;
        for(int i = 0; i < A.size() || i < B.size(); i ++){
            if(i < A.size()) t += A.get(i);
            if(i < B.size()) t += B.get(i);
            C.add(t % 10);
            t /= 10;
        }
        if(t != 0) C.add(t);
        return C;
    }
    public static void main(String[] args) throws IOException{
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String a = in.readLine();
        String b = in.readLine();
        List<Integer> A = new ArrayList<>();
        List<Integer> B = new ArrayList<>();
        for(int i = a.length() - 1; i >= 0; i --) A.add(a.charAt(i) - '0');
        for(int i = b.length() - 1; i >= 0; i --) B.add(b.charAt(i) - '0');
        
        List<Integer> C = add(A, B);
        for(int i = C.size() - 1; i >= 0; i --) System.out.print(C.get(i));
    }
}
```

#### 高精度减法

给定两个正整数（不含前导 0 ），计算它们的差，计算结果可能为负数。

```java
import java.util.*;
import java.io.*;

public class Main{
    static List<Integer> sub(List<Integer> A, List<Integer> B){
        List<Integer> C = new ArrayList<>();
        int t = 0;
        for(int i = 0; i < A.size(); i ++){
            if(i < B.size()) t += A.get(i) - B.get(i);
            else t += A.get(i);
            if(t < 0){
                C.add(t + 10);
                t = -1;
            }else{
                C.add(t);
                t = 0;
            }
        }
        int j = C.size() - 1;
        while(j > 0 && C.get(j) == 0){
            C.remove(j);
            j --;
        }
        return C;
    }
    // 判断a>b
    static boolean compare(String a, String b){
        boolean res = true;
        if(a.length() == b.length()){
            for(int i = 0; i < a.length(); i ++){
                if(a.charAt(i) > b.charAt(i)){
                    break;
                }else if(a.charAt(i) == b.charAt(i)){
                    continue;
                }else{
                    res = false;
                    break;
                }
            }
        }else if(a.length() < b.length()){
            res = false;
        }
        return res;
    }
    public static void main(String[] args) throws IOException{
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String a = in.readLine();
        String b = in.readLine();
        char op = ' ';
        if(!compare(a, b)){
            op = '-';
            String t = a;
            a = b;
            b = t;
        }
        List<Integer> A = new ArrayList<>();
        List<Integer> B = new ArrayList<>();
        for(int i = a.length() - 1; i >= 0; i --) A.add(a.charAt(i) - '0');
        for(int i = b.length() - 1; i >= 0; i --) B.add(b.charAt(i) - '0');
        List<Integer> C = sub(A, B);
        if(op == '-'){
            System.out.print(op);
        }
        for(int i = C.size() - 1; i >= 0; i --) System.out.print(C.get(i));
    }
}
```

#### 高精度乘法

给定两个非负整数（不含前导 0 ） A 和 B，请你计算 A×B 的值。

数的范围
`1≤A的长度≤100000, 0≤B≤10000`

```java
import java.util.*;
public class Main{
    static List<Integer> mul(List<Integer> A, int b){
        List<Integer> C = new ArrayList<>();
        int t = 0;
        for(int i = 0; i < A.size() || t != 0; i ++){
            if(i < A.size()){
                t += A.get(i) * b;
            }
            C.add(t % 10);
            t /= 10;
        }
        // 去除前导零
        int j = C.size() - 1;
        while(j > 0 && C.get(j) == 0){
            C.remove(j);
            j --;
        }
        return C;
    }
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        String a = sc.next();
        int b = sc.nextInt();
        List<Integer> A = new ArrayList<>();
        for(int i = a.length() - 1; i >= 0; i --){
            A.add(a.charAt(i) - '0');
        }
        List<Integer> C = mul(A, b);
        for(int i = C.size() - 1; i >= 0; i --){
            System.out.print(C.get(i));
        }
    }
}
```

#### 高精度除法

给定两个非负整数（不含前导 0） A，B，请你计算 A/B的商和余数。

数据范围
`1≤A的长度≤100000,1≤B≤10000,B一定不为 0`

```java
import java.util.*;
import java.io.*;
public class Main{
    static int r = 0; // 余数r
    static List<Integer> div(List<Integer> A, int b){
        List<Integer> C = new ArrayList<>();
        int len = A.size();
        for(int i = 0; i < A.size(); i ++){
            r = A.get(i) + r * 10;
            C.add(r / b);
            r %= b;
        }
        int j = 0;
        while(C.size() > 1 && C.get(j) == 0){
            C.remove(j);
        }
        return C;
    }
    public static void main(String[] args) throws IOException{
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        String sa = in.readLine();
        String sb = in.readLine();
        List<Integer> A = new ArrayList<>();
        int b = Integer.parseInt(sb);
        for(int i = 0; i < sa.length(); i ++){
            A.add(sa.charAt(i) - '0');
        }
        List<Integer> C = div(A, b);
         for(int i = 0; i < C.size(); i ++){
            System.out.print(C.get(i));
        }
        System.out.println();
        System.out.println(r);
    }
}
```

### 前缀和与差分

#### 前缀和

```java
import java.util.Scanner;
public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int m = sc.nextInt();
        int[] s = new int[n + 1];
        s[0] = 0;
        for(int i = 1; i <= n; i ++){
            s[i] += s[i - 1] + sc.nextInt();
        }
        while(m -- > 0){
            int l = sc.nextInt();
            int r = sc.nextInt();
            System.out.println(s[r] - s[l - 1]);
        }
    }
}
```

#### 子矩阵的和

输入一个 n行 m列的整数矩阵，再输入 q个询问，每个询问包含四个整数 x1,y1,x2,y2，表示一个子矩阵的左上角坐标和右下角坐标。

对于每个询问输出子矩阵中所有数的和。

```java
import java.io.*;

class Main{
    public static void main(String[] args) throws IOException{
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String[] str = reader.readLine().split(" ");
        int row = Integer.parseInt(str[0]);
        int col = Integer.parseInt(str[1]);
        int n = Integer.parseInt(str[2]);
        int[][] matrix = new int[row][col];
        for(int i = 0; i < row; i++){
            String[] str1 = reader.readLine().split(" ");
            for(int j = 0; j < col; j++){
                matrix[i][j] = Integer.parseInt(str1[j]);
            }
        }
        int[][] sum = new int[row + 1][col + 1];
        for(int i = 1; i < row + 1; i++){
            for(int j = 1; j < col + 1; j++){
                sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + matrix[i - 1][j - 1];
            }
        }
        for(int i = 0; i < n; i++){
            String[] str2 = reader.readLine().split(" ");
            int row1 = Integer.parseInt(str2[0]);
            int col1 = Integer.parseInt(str2[1]);
            int row2 = Integer.parseInt(str2[2]);
            int col2 = Integer.parseInt(str2[3]);
            System.out.println(sum[row2][col2] - sum[row1 -1][col2] - sum[row2][col1 - 1] + sum[row1 - 1][col1 - 1]);
        }
    }
}
```

#### 差分

输入一个长度为 n的整数序列。

接下来输入 m个操作，每个操作包含三个整数 l,r,c，表示将序列中 [l,r]之间的每个数加上 c。

请你输出进行完所有操作后的序列。

```java
import java.util.*;
import java.io.*;
class Main{
    public static void main(String[] args) throws IOException{
        BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
        int n, m;
        String[] p = in.readLine().split(" ");
        n = Integer.parseInt(p[0]);
        m = Integer.parseInt(p[1]);
        int[] a = new int[n + 1];
        int[] b = new int[n + 1];
        p = in.readLine().split(" ");
        for(int i = 1; i <= n; i ++){
            a[i] = Integer.parseInt(p[i - 1]);
            b[i] = a[i] - a[i - 1];
        }
        while(m -- > 0){
            int l, r, c;
            p = in.readLine().split(" ");
            l = Integer.parseInt(p[0]);
            r = Integer.parseInt(p[1]);
            c = Integer.parseInt(p[2]);
            b[l] += c;
            if(r + 1 <= n){
                b[r + 1] -= c;
            }
        }
        int num = 0;
        for(int i = 1; i <= n; i ++){
            num += b[i];
            System.out.print(num + " ");
        }
    }
}
```

#### 差分矩阵

输入一个 n行 m 列的整数矩阵，再输入 q个操作，每个操作包含五个整数 x1,y1,x2,y2,c，其中 (x1,y1)和 (x2,y2)表示一个子矩阵的左上角坐标和右下角坐标。

每个操作都要将选中的子矩阵中的每个元素的值加上 c。

请你将进行完所有操作后的矩阵输出。

```java
import java.util.*;
import java.io.*;

public class Main{
    
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n, m, q;
        String[] s1 = br.readLine().split(" ");
        n = Integer.parseInt(s1[0]); m = Integer.parseInt(s1[1]); q = Integer.parseInt(s1[2]);
        int[][] a = new int[n + 2][m + 2];
        int[][] b = new int[n + 2][m + 2];
        for(int i = 1; i <= n; i ++){
            String[] s2 = br.readLine().split(" ");
            for(int j = 1; j <= m; j ++){
                a[i][j] = Integer.parseInt(s2[j - 1]);
                b[i][j] = a[i][j] - a[i - 1][j] - a[i][j - 1] + a[i - 1][j - 1];
            }
        }
        while(q -- > 0){
            String[] s3 = br.readLine().split(" ");
            int x1, y1, x2, y2, c;
            x1 = Integer.parseInt(s3[0]); y1 = Integer.parseInt(s3[1]); 
            x2 = Integer.parseInt(s3[2]); y2 = Integer.parseInt(s3[3]); 
            c = Integer.parseInt(s3[4]);
            b[x1][y1] += c;
            b[x2 + 1][y1] -= c;
            b[x1][y2 + 1] -= c;
            b[x2 + 1][y2 + 1] += c;
        }
        for(int i = 1; i <= n; i ++){
            for(int j = 1; j <= m; j ++){
                a[i][j] = a[i - 1][j] + a[i][j - 1] - a[i - 1][j - 1] + b[i][j];
                System.out.print(a[i][j] + " ");
            }
            System.out.println();
        }
    }
}
```

### 双指针算法

#### 最长连续不重复子序列

给定一个长度为 n的整数序列，请找出最长的不包含重复的数的连续区间，输出它的长度。

```java
import java.io.*;
class Main{
    public static void main(String[] args) throws IOException{
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(reader.readLine());
        int[] a = new int[n];
        int[] hash = new int [100010];
        int ans = 0;
        String[] s = reader.readLine().split(" ");
        for(int i = 0; i < n; i ++){
            a[i] = Integer.parseInt(s[i]);
        }
        for(int i = 0, j = 0; i < n; i ++){
            hash[a[i]] ++;
            while(hash[a[i]] > 1){
                hash[a[j]] --;
                j ++;
            }
            ans = Math.max(ans, i - j + 1);
        }
        System.out.println(ans);
        reader.close();
    }
}
```

#### 数组元素的目标和

给定两个升序排序的有序数组 A和 B，以及一个目标值 x。

数组下标从 0开始。

请你求出满足 A[i]+B[j]=x 的数对 (i,j)。

数据保证有唯一解。

```java
import java.io.*;
class Main{
    public static void main(String[] args) throws IOException{
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String[] s1 = reader.readLine().split(" ");
        String[] s2 = reader.readLine().split(" ");
        String[] s3 = reader.readLine().split(" ");
        int n, m, x;
        n = Integer.parseInt(s1[0]);
        m = Integer.parseInt(s1[1]);
        x = Integer.parseInt(s1[2]);
        int[] A = new int[n];
        int[] B = new int[m];
        for(int i = 0; i < n; i ++){
            A[i] = Integer.parseInt(s2[i]);
        }
        for(int i = 0; i < m; i ++){
            B[i] = Integer.parseInt(s3[i]);
        }
        for(int i = 0, j = m - 1; i < n; i ++){
            int sum = A[i] + B[j];
            while(j >= 0 && sum > x){
                sum = A[i] + B[-- j];
            }
            if(j < 0){
                break;
            }
            if(sum == x){
                System.out.print(i + " " + j);
                break;
            }
        }
        reader.close();
    }
}
```

#### 判断子序列

给定一个长度为 n的整数序列 a1,a2,…,an以及一个长度为 m的整数序列 b1,b2,…,bm。

请你判断 a序列是否为 b 序列的子序列。

子序列指序列的一部分项按原有次序排列而得的序列，例如序列 {a1,a3,a5}是序列 {a1,a2,a3,a4,a5}的一个子序列。

```java
import java.util.*;
import java.io.*;

public class Main{
    
    static int N = 100010;
    static long[] a = new long[N];
    static long[] b = new long[N];
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] s1 = br.readLine().split(" ");
        String[] s2 = br.readLine().split(" ");
        String[] s3 = br.readLine().split(" ");
        int n, m;
        n = Integer.parseInt(s1[0]); m = Integer.parseInt(s1[1]);
        for(int i = 0; i < n; i ++) a[i] = Integer.parseInt(s2[i]);
        for(int i = 0; i < m; i ++) b[i] = Integer.parseInt(s3[i]);
        for(int i = 0, j = 0; i < m; i ++){
            if(a[j] == b[i]) j ++;
            if(j == n){
                System.out.println("Yes");
                return;
            }
        }
        System.out.println("No");
    }
}
```

### 位运算

#### 二进制中1的个数

给定一个长度为 n的数列，请你求出数列中每个数的二进制表示中 1的个数。

```java
import java.util.*;

public class Main{
    static int N = 100010;
    static long[] a = new long[N];
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        for(int i = 0; i < n; i ++) a[i] = sc.nextInt();
        for(int i = 0; i < n; i ++){
            int t = 0;
            while(a[i] != 0){
                t += a[i] & 1;
                a[i] >>= 1;
            }
            System.out.print(t + " ");
        }
    }
}
```

### 离散化

#### 区间和

假定有一个无限长的数轴，数轴上每个坐标上的数都是 0。

现在，我们首先进行 n次操作，每次操作将某一位置 x上的数加 c。

接下来，进行 m次询问，每个询问包含两个整数 l和 r，你需要求出在区间 [l,r]之间的所有数的和。

```java
import java.util.*;

class PII implements Comparable<PII>{
    int first;
    int second;
    public PII(int first, int second){
        this.first = first;
        this.second = second;
    }
    
    @Override
    public int compareTo(PII o){
        return this.first - o.first;
    }
}

public class Main{
    
    static int N = 300010;
    static int[] a = new int[N];
    static int[] s = new int[N];
    static List<Integer> alls = new ArrayList<>();
    static List<PII> add = new ArrayList<>();
    static List<PII> query = new ArrayList<>();
    
    static int find(int x){
        int l = 0, r = alls.size() - 1;
        while(l < r){
            int mid = l + r >> 1;
            if(alls.get(mid) >= x) r = mid;
            else l = mid + 1;
        }
        return r + 1;
    }
    
    static void unique(){
        int j = 0;
        for(int i = 0; i < alls.size(); i ++){
            if(i == 0 || alls.get(i) != alls.get(i - 1)){
                alls.set(j ++, alls.get(i));
            }
        }
        int k = j;
        while(alls.size() > j) alls.remove(k);
    }
    
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n, m;
        n = sc.nextInt(); m = sc.nextInt();
        for(int i = 0; i < n; i ++){
            int x, c;
            x = sc.nextInt(); c = sc.nextInt();
            add.add(new PII(x, c));
            alls.add(x);
        }
        for(int i = 0; i < m; i ++){
            int l, r;
            l = sc.nextInt(); r = sc.nextInt();
            query.add(new PII(l, r));
            alls.add(l);
            alls.add(r);
        }
        Collections.sort(alls);
        unique();
        for(PII p : add){
            int x = find(p.first);
            a[x] += p.second;
        }
        for(int i = 1; i <= alls.size(); i ++) s[i] = s[i - 1] + a[i];
        for(PII p : query){
            int l, r;
            l = find(p.first);
            r = find(p.second);
            System.out.println(s[r] - s[l - 1]);
        }
    }
}
```

### 区间合并

#### 区间合并

给定 n个区间 [li,ri]，要求合并所有有交集的区间。

注意如果在端点处相交，也算有交集。

输出合并完成后的区间个数。

例如：[1,3]和 [2,6]可以合并为一个区间 [1,6]。

```java
import java.util.*;

class PII{
    long l;
    long r;
    public PII(long l, long r){
        this.l = l;
        this.r = r;
    }
}
public class Main{
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        List<PII> list = new ArrayList<>();
        for(int i = 0; i < n; i ++){
            int l, r;
            l = sc.nextInt(); r = sc.nextInt();
            PII pii = new PII(l, r);
            list.add(pii);
        }
        list.sort(new Comparator<PII>(){
           public int compare(PII p1, PII p2){
               return (int)(p1.l - p2.l);
           } 
        });
        int cnt = 1;
        PII cur = list.get(0);
        for(int i = 1; i < list.size(); i ++){
            PII p = list.get(i);
            if(cur.r < p.l){
                cnt ++;
                cur = p;
            }else{
                if(cur.r < p.r) cur = p;
            }
        }
        System.out.println(cnt);
    }
}
```

## 数据结构

单链表，双链表，栈，队列，单调栈，单调队列，KMP，Trie，并查集，堆，哈希表。

### 链表

#### 单链表

实现一个单链表，链表初始为空，支持三种操作：

1. 向链表头插入一个数；
2. 删除第 k个插入的数后面的数；
3. 在第 k个插入的数后插入一个数。

现在要对该链表进行 M次操作，进行完所有操作后，从头到尾输出整个链表。

注意:题目中第 k个插入的数并不是指当前链表的第 k个数。例如操作过程中一共插入了 n个数，则按照插入的时间顺序，这 n个数依次为：第 1个插入的数，第 2个插入的数，…第 n个插入的数。

```java
import java.io.*;
public class Main{
    static int[] ne = new int[100100];
    static int[] e = new int[100100];
    static int head, idx;
    public static void main(String[] args) throws IOException{
        init();
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.parseInt(br.readLine());
        while(n -- > 0){
            String[] s = br.readLine().split(" ");
            if("H".equals(s[0])){
                int x = Integer.parseInt(s[1]);
                addHead(x);
            }else if("D".equals(s[0])){
                int k = Integer.parseInt(s[1]);
                if(k == 0) head = ne[head];
                else del(k - 1);
            }else{
                int k = Integer.parseInt(s[1]);
                int x = Integer.parseInt(s[2]);
                add(k - 1, x);
            }
        }
        for(int i = head; i != -1; i = ne[i]){
            System.out.print(e[i] + " ");
        }
    }
    static void add(int k, int x){
        e[idx] = x;
        ne[idx] = ne[k];
        ne[k] = idx ++;
    }
    static void addHead(int x){
        e[idx] = x;
        ne[idx] = head;
        head = idx ++;
    }
    static void del(int k){
        ne[k] = ne[ne[k]];
    }
    static void init(){
        head = -1;
        idx = 0;
    }
}
```

#### 双链表

实现一个双链表，双链表初始为空，支持 5种操作：

1. 在最左侧插入一个数；
2. 在最右侧插入一个数；
3. 将第 k个插入的数删除；
4. 在第 k个插入的数左侧插入一个数；
5. 在第 k个插入的数右侧插入一个数

现在要对该链表进行 M次操作，进行完所有操作后，从左到右输出整个链表。

```java
import java.io.*;
public class Main{
    static int N = 100100;
    static int[] l = new int[N];
    static int[] r = new int[N];
    static int[] e = new int[N];
    static int idx, n;
    public static void main(String[] args) throws IOException{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        n = Integer.parseInt(br.readLine());
        init();
        while(n -- > 0){
            String[] s = br.readLine().split(" ");
            int k, x;
            switch(s[0]){
                case "L":
                    x = Integer.parseInt(s[1]);
                    addForRright(0, x);
                    break;
                case "R":
                    x = Integer.parseInt(s[1]);
                    addForRright(l[1], x);
                    break;
                case "D":
                    k = Integer.parseInt(s[1]);
                    remove(k + 1);
                    break;
                case "IL":
                    k = Integer.parseInt(s[1]);
                    x = Integer.parseInt(s[2]);
                    addForRright(l[k + 1], x);
                    break;
                case "IR":
                    k = Integer.parseInt(s[1]);
                    x = Integer.parseInt(s[2]);
                    addForRright(k + 1, x);
                    break;
            }
        }
        for(int i = r[0]; i != 1; i = r[i]){
            System.out.print(e[i] + " ");
        }
    }
    static void remove(int k){
        r[l[k]] = r[k];
        l[r[k]] = l[k];
    }
    static void addForRright(int k, int x){
        e[idx] = x;
        r[idx] = r[k];
        l[idx] = k;
        l[r[k]] = idx;
        r[k] = idx;
        idx ++;
    }
    static void init(){
       l[1] = 0;
       r[0] = 1;
       idx = 2;
    }
}

```

### 栈

#### 模拟栈

实现一个栈，栈初始为空，支持四种操作：

1. push x – 向栈顶插入一个数 x；
2. pop – 从栈顶弹出一个数；
3. empty – 判断栈是否为空；
4. query – 查询栈顶元素。

现在要对栈进行 M个操作，其中的每个操作 3和操作 4都要输出相应的结果。

```java
import java.util.Scanner;

public class Main {
    static final int N = 100010;
    static int[] st = new int[N];
    static int top = -1;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            String s = sc.next();
            if ("push".equals(s)) {
                st[++ top] = sc.nextInt();
            } else if ("pop".equals(s)) {
                top --;
            } else if ("query".equals(s)) {
                System.out.println(st[top]);
            } else {
                System.out.println(top == -1 ? "YES" : "NO");
            }
        }
    }
}
```

#### 表达式求值

给定一个表达式，其中运算符仅包含 +,-,*,/（加 减 乘 整除），可能包含括号，请你求出表达式的最终值。

注意：

1. 数据保证给定的表达式合法。
2. 题目保证符号 - 只作为减号出现，不会作为负号出现，例如，-1+2,(2+2)*(-(1+1)+2) 之类表达式均不会出现。
3. 题目保证表达式中所有数字均为正整数。
4. 题目保证表达式在中间计算过程以及结果中，均不超过整数最大值。
5. 题目中的整除是指向 0取整，也就是说对于大于 0的结果向下取整，例如 5/3=1，对于小于 0的结果向上取整，例如 5/(1−4)=−1。

```java
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.Stack;

public class Main {
    static final int N = 100010;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        Stack<Character> op = new Stack<>();
        Stack<Integer> num = new Stack<>();
        Map<Character, Integer> map = new HashMap<>(){{
            put('+', 1);
            put('-', 1);
            put('*', 2);
            put('/', 2);
        }};
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            int x = 0, j = i;
            if (Character.isDigit(c)) {
                while (j < s.length() && Character.isDigit(s.charAt(j))) {
                    x = x * 10 + s.charAt(j) - '0';
                    j ++;
                }
                num.push(x);
                i = j - 1;
            } else if (c == '(') {
                op.push(c);
            } else if (c == ')') {
                while (op.peek() != '(') {
                    eval(op, num);
                }
                op.pop();
            } else {
                while (!op.empty() && op.peek() != '(' && map.get(op.peek()) >= map.get(c)) {
                    eval(op, num);
                }
                op.push(c);
            }
        }
        while (!op.empty()) eval(op, num);
        System.out.println(num.peek());
    }

    static void eval(Stack<Character> op, Stack<Integer> num) {
        int b = num.pop();
        int a = num.pop();
        int res = 0;
        char c = op.pop();
        if (c == '+') {
            res = a + b;
        } else if (c == '-') {
            res = a - b;
        } else if (c == '*') {
            res = a * b;
        } else {
            res = a / b;
        }
        num.push(res);
    }
}
```

### 队列

#### 模拟队列

实现一个队列，队列初始为空，支持四种操作：

1. push x – 向队尾插入一个数 x；
1. pop – 从队头弹出一个数；
1. empty – 判断队列是否为空；
1. query – 查询队头元素。

现在要对队列进行 M个操作，其中的每个操作 3和操作 4都要输出相应的结果。

```java
import java.util.Scanner;

public class Main {
    static final int N = 100010;
    static int[] queue = new int[N];
    static int hh = 0, tt = -1;
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            String s = sc.next();
            if ("push".equals(s)) {
                queue[++ tt] = sc.nextInt();
            } else if ("pop".equals(s)) {
                hh ++;
            } else if ("query".equals(s)) {
                System.out.println(queue[hh]);
            } else {
                System.out.println(hh > tt ? "YES" : "NO");
            }
        }
    }
}

```

### 单调栈

#### 单调栈

给定一个长度为` N `的整数数列，输出每个数左边第一个比它小的数，如果不存在则输出`−1`。

```java
import java.util.Stack;
import java.util.Scanner;

public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i ++) arr[i] = sc.nextInt();
        Stack<Integer> stk = new Stack();
        for (int i = 0; i < n; i ++) {
            while (!stk.isEmpty() && stk.peek() >= arr[i]) stk.pop();
            int out = -1;
            if (!stk.isEmpty()) out = stk.peek();
            System.out.print(out + " ");
            stk.push(arr[i]);
        }
    }
}
```

### 单调队列

#### 滑动窗口

给定一个大小为 `n ≤ 1e6` 的数组。有一个大小为 `k` 的滑动窗口，它从数组的最左边移动到最右边。
你只能在窗口中看到 `k` 个数字。每次滑动窗口向右移动一个位置。

以下是一个例子：
该数组为 `[1 3 -1 -3 5 3 6 7]`，`k` 为 33。

| 窗口位置            | 最小值 | 最大值 |
| ------------------ | ----- | ----- |
| [1 3 -1] -3 5 3 6 7 | -1     | 3      |
| 1 [3 -1 -3] 5 3 6 7 | -3     | 3      |
| 1 3 [-1 -3 5] 3 6 7 | -3     | 5      |
| 1 3 -1 [-3 5 3] 6 7 | -3     | 5      |
| 1 3 -1 -3 [5 3 6] 7 | 3      | 6      |
| 1 3 -1 -3 5 [3 6 7] | 3      | 7      |

你的任务是确定滑动窗口位于每个位置时，窗口中的最大值和最小值。

```java
import java.io.*;

public class Main {
    static final int N = 1000010;
    static int[] arr = new int[N];
    static int[] q = new int[N];
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] s1 = br.readLine().split(" ");
        String[] s2 = br.readLine().split(" ");
        
        int n = Integer.parseInt(s1[0]), k = Integer.parseInt(s1[1]);
        for (int i = 0; i < n; i ++) arr[i] = Integer.parseInt(s2[i]);
        int hh = 0, tt = -1;
        for (int i = 0; i < n; i ++) {
            if (hh <= tt && q[hh] < i - k + 1) hh ++;
            while (hh <= tt && arr[q[tt]] >= arr[i]) tt --;
            q[++ tt] = i;
            if (i >= k - 1) {
                System.out.print(arr[q[hh]] + " ");
            }
        }
        System.out.println("");
        hh = 0; tt = -1;
        for (int i = 0; i < n; i ++) {
            if (hh <= tt && q[hh] < i - k + 1) hh ++;
            while (hh <= tt && arr[q[tt]] <= arr[i]) tt --;
            q[++ tt] = i;
            if (i >= k - 1) {
                System.out.print(arr[q[hh]] + " ");
            }
        }
    }
}
```

### KMP

#### KMP字符串

给定一个模式串 `P`，以及一个字符串 `S`，所有字符串中只包含大小写英文字母以及阿拉伯数字。
模式串 `P` 在字符串 `S` 中多次作为子串出现。
求出模式串 `P `在字符串 `S` 中所有出现的位置的起始下标。

```java
import java.io.*;
public class Main{
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int n = Integer.valueOf(br.readLine());
        char[] p = br.readLine().toCharArray();
        int m = Integer.valueOf(br.readLine());
        char[] s = br.readLine().toCharArray();
        int[] ne = new int[n];

        ne[0] = -1;
        for (int i = 1, j = -1; i < n; i ++) {
            while (j != -1 && p[i] != p[j + 1]) j = ne[j];
            if (p[i] == p[j + 1]) j ++;
            ne[i] = j;
        }
        for (int i = 0, j = -1; i < m; i ++) {
            while (j != -1 && s[i] != p[j + 1]) j = ne[j];
            if (s[i] == p[j + 1]) j ++;
            if (j == n - 1){
                bw.write(i - n + 1 + " ");
                j = ne[j];
            }
        }
    }
}
```

### 哈希表

#### 模拟散列表

维护一个集合，支持如下几种操作：
`I x`，插入一个整数 `x`；
`Q x`，询问整数 `x` 是否在集合中出现过；
现在要进行 `N` 次操作，对于每个询问操作输出对应的结果。

**开放寻址法**

```java
import java.util.*;
public class Main {
    final static int N = 200003, nullVal = 0x3f3f3f3f;
    static int[] h = new int[N];
    
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Arrays.fill(h, nullVal);
        while (n -- > 0) {
            String op = sc.next();
            int x = sc.nextInt();
            int k = find(x);
            if ("I".equals(op)) {
                h[k] = x;
            } else {
                if (h[k] != nullVal) System.out.println("Yes");
                else System.out.println("No");
            }
        }
    }
    static int get_hash(int x) {
        return (x % N + N) % N;
    }
    static int find(int x) {
        int k = get_hash(x);
        while (h[k] != nullVal && h[k] != x) {
            k ++;
            if (k == N) k = 0;
        }
        return k;
    }
}
```

**拉链法**

```java
import java.util.*;
public class Main {
    final static int N = 100003;
    static int[] h = new int[N], e = new int[N], ne = new int[N];
    static int idx;
    
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Arrays.fill(h, -1);
        while (n -- > 0) {
            String op = sc.next();
            int x = sc.nextInt();
            if ("I".equals(op)) {
                insert(x);
            } else {
                if (find(x)) System.out.println("Yes");
                else System.out.println("No");
            }
        }
    }
    static int get_hash(int x) {
        return (x % N + N) % N;
    }
    static void insert(int x) {
        int k = get_hash(x);
        e[idx] = x;
        ne[idx] = h[k];
        h[k] = idx ++;
    }
    static boolean find(int x) {
        int k = get_hash(x);
        for (int i = h[k]; i != -1; i = ne[i]) {
            if (e[i] == x) {
                return true;
            }
        }
        return false;
    }
}
```

#### 字符串哈希

给定一个长度为 `n` 的字符串，再给定 `m` 个询问，每个询问包含四个整数 `l1,r1,l2,r2`，请你判断 `[l1,r1]` 和 `[l2,r2]` 这两个区间所包含的字符串子串是否完全相同。

字符串中只包含大小写英文字母和数字。

```java
import java.util.*;
public class Main {
    final static int N = 100010, P = 131;
    static String s;
    static long[] h = new long[N], p = new long[N];
    
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt(), m = sc.nextInt();
        s = " " + sc.next();
        p[0] = 1L;
        for (int i = 1; i < s.length(); i ++) {
            p[i] = p[i - 1] * P;
            h[i] = h[i - 1] * P + s.charAt(i);
        }
        while (m -- > 0) {
            int l1 = sc.nextInt(), r1 = sc.nextInt(), l2 = sc.nextInt(), r2 = sc.nextInt();
            if (get_hash(l1, r1) == get_hash(l2, r2)) System.out.println("Yes");
            else System.out.println("No");
        }
    }
    static long get_hash(int l, int r) {
        return h[r] - h[l - 1] * p[r - l + 1];
    }
}

```

## 搜索与图论

## 数学知识

### 质数

#### 试除法判定质数

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            int x = sc.nextInt();
            String res = "Yes";
            if (!is_prime(x)) {
                res = "No";
            }
            System.out.println(res);
        }
    }
    static boolean is_prime(int x) {
        if (x < 2) {
            return false;
        }
        for (int i = 2; i <= x / i; i ++) {
            if (x % i == 0) {
                return false;
            }
        }
        return true;
    }
}
```

#### 分解质因数

给定 `n` 个正整数 `x` ，将每个数分解质因数，并按照质因数从小到大的顺序输出每个质因数的底数和指数。

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            int x = sc.nextInt();
            divide(x);
            System.out.println();
        }
    }
    static void divide(int x) {
        for (int i = 2; i <= x / i; i ++) {
            if (x % i == 0) {
                int cnt = 0;
                while (x % i == 0) {
                    x /= i;
                    cnt ++;
                }
                System.out.println(i + " " + cnt);
            }
        }
        if (x > 1) {
            System.out.println(x + " " + 1);
        }
    }
}
```

#### 筛质数

给定一个正整数 `n` ，请你求出 `1∼n` 中质数的个数。

```java
import java.util.*;
public class Main {
    static int res = 0;
    static boolean[] st;
    static int[] primes;
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        st = new boolean[n + 1];
        primes = new int[n + 1];
        get_primes(n);
        System.out.println(res);
    }
    // 埃氏筛法 时间复杂度 O(nloglogn)
    static void get_primes(int n) {
        for (int i = 2; i <= n; i ++) {
            if (!st[i]) {
                res ++;
                for (int j = i + i; j <= n; j += i) st[j] = true;
            }
        }
    }
    // 线性筛法 时间复杂度 O(n)
    static void get_primes(int n) {
        for (int i = 2; i <= n; i ++) {
            if (!st[i]) primes[res ++] = i;
            for (int j = 0; primes[j] <= n / i; j ++) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0) break; // primes[j]一定是 i 的最小质因子
            }
        }
    }
}
```

### 约数

#### 试除法求约数

给定 `n` 个正整数 `ai` ，对于每个整数 `ai`，请你按照从小到大的顺序输出它的所有约数。

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            int x = sc.nextInt();
            var res = get_divisor(x);
            Collections.sort(res);
            for (int i : res) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
    static List<Integer> get_divisor(int x) {
        List<Integer> res = new ArrayList<>();
        for (int i = 1; i <= x / i; i ++) {
            if (x % i == 0) {
                res.add(i);
                if (i != x / i) res.add(x / i);
            }
        }
        return res;
    }
}
```

#### 约数个数

给定 `n`个正整数 `ai`，请你输出这些数的乘积的约数个数，答案对 `109+7`取模。

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<Integer, Integer> primes = new HashMap<>();
        while (n -- > 0) {
            int x = sc.nextInt();
            for (int i = 2; i <= x / i; i ++) {
                while (x % i == 0) {
                    x /= i;
                    primes.put(i, primes.getOrDefault(i, 0) + 1);
                }
            }
            if (x > 1) primes.put(x, primes.getOrDefault(x, 0) + 1);
        }
        
        long res = 1L;
        final int MOD = (int)1e9 + 7;
        for (int k : primes.keySet()) {
            res = res * (primes.get(k) + 1) % MOD;
        }
        System.out.println(res);
    }
}
```

#### 约数之和

给定 `n`个正整数 `ai`，请你输出这些数的乘积的约数之和，答案对 `109+7`取模。

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        Map<Integer, Integer> primes = new HashMap<>();
        while (n -- > 0) {
            int x = sc.nextInt();
            for (int i = 2; i <= x / i; i ++) {
                while (x % i == 0) {
                    x /= i;
                    primes.put(i, primes.getOrDefault(i, 0) + 1);
                }
            }
            if (x > 1) primes.put(x, primes.getOrDefault(x, 0) + 1);
        }
        
        long res = 1L;
        final int MOD = (int)1e9 + 7;
        for (int k : primes.keySet()) {
            int v = primes.get(k);
            long t = 1L;
            while (v -- > 0) t = (t * k + 1) % MOD;
            res = res * t % MOD;
        }
        System.out.println(res);
    }
}
```

#### 最大公约数

```java
import java.util.*;
public class Main {
    public static void main(String args[]) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            int a = sc.nextInt(), b = sc.nextInt();
            int res = gcd(a, b);
            System.out.println(res);
        }
    }
    /**
     * 假设d 可以整除a , b, 那么d 可以整除 a * x + b * y
     * (a, b)的最大公约数等于(b, a % b)的最大公约数
     * 因为a % b = a - (a / b) * b = a - c * b, 其中c = a / b
     * d 可以整除a , b; d 可以整除 b, a - c * b
     */
    static int gcd(int a, int b) {
        return b != 0 ? gcd(b, a % b) : a;
    }
}
```

### 欧拉函数

#### 欧拉函数

```java
import java.util.*;
public class Main {
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        while (n -- > 0) {
            int x = sc.nextInt();
            int res = x;
            for (int i = 2; i <= x / i; i ++) {
                if (x % i == 0) {
                    res = res / i * (i - 1);
                    while (x % i == 0) x /= i;
                }
            }
            if (x > 1) res = res / x * (x - 1);
            System.out.println(res);
        }
    }
}
```

#### 筛法求欧拉函数

给定一个正整数 `n`，求 `1∼n`中每个数的欧拉函数之和。

```java
import java.util.*;
public class Main {
    final static int N = 1000010;
    static int cnt = 0;
    static boolean[] st = new boolean[N];
    static int[] phi = new int[N], primes = new int[N];
    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        System.out.println(get_eulers(n));
    }
    static long  get_eulers(int n) {
        phi[1] = 1;
        for (int i = 2; i <= n; i ++) {
            if (!st[i]) {
                primes[cnt ++] = i;
                phi[i] = i - 1;
            }
            for (int j = 0; primes[j] <= n / i; j ++) {
                st[primes[j] * i] = true;
                if (i % primes[j] == 0) {
                    phi[primes[j] * i] = phi[i] * primes[j]; 
                    break;
                }
                phi[primes[j] * i] = phi[i] * (primes[j] - 1);
            }
        }
        long res = 0L;
        for (int i = 1; i <= n; i ++) res += phi[i];
        return res;
    }
}
```

### 快速幂

#### 快速幂

给定 `n` 组 `ai,bi,pi`，对于每组数据，求出 `ai^bi mod pi`的值。

```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.valueOf(br.readLine());
        while (n -- > 0) {
            String[] ss = br.readLine().split(" ");
            int a = Integer.valueOf(ss[0]), b = Integer.valueOf(ss[1]), p = Integer.valueOf(ss[2]);
            System.out.println(qmi(a, b, p));
        }
    }
    static long qmi(long a, long b, long p) {
        long res = 1L;
        while (b != 0) {
            if ((b & 1) != 0) res = res * a % p;
            b >>= 1;
            a = a * a % p;
        }
        return res;
    }
}
```
#### 快速幂求逆元

```java
import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.valueOf(br.readLine());
        while (n -- > 0) {
            String[] ss = br.readLine().split(" ");
            int a = Integer.valueOf(ss[0]), p = Integer.valueOf(ss[1]);
            if (a % p == 0) System.out.println("impossible");
            else System.out.println(qmi(a, p - 2, p));
        }
    }
    static long qmi(long a, long b, long p) {
        long res = 1L;
        while (b != 0) {
            if ((b & 1) != 0) res = res * a % p;
            b >>= 1;
            a = a * a % p;
        }
        return res;
    }
}
```

### 扩展欧几里得算法

#### 扩展欧几里得算法

给定 `n` 对正整数 `ai,bi`，对于每对数，求出一组 `xi,yi`，使其满足 `ai×xi+bi×yi=gcd(ai,bi)`。

```java
import java.io.*;

public class Main {
    static int[] x = new int[1];
    static int[] y = new int[1];
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.valueOf(br.readLine());
        while (n -- > 0) {
            String[] ss = br.readLine().split(" ");
            int a = Integer.valueOf(ss[0]), b = Integer.valueOf(ss[1]);
            exgcd(a, b, x, y);
            System.out.println(x[0] + " " + y[0]);
        }
    }
    static int exgcd(int a, int b, int[] x, int[] y) {
        if (b == 0) {
            x[0] = 1; y[0] = 0;
            return a;
        }
        int d = exgcd(b, a % b, y, x);
        y[0] -= (a / b) * x[0];
        return d;
    }
}
```

#### 线性同余方程

给定 `n` 组数据 `ai,bi,mi`，对于每组数求出一个 `xi`，使其满足` ai×xi≡bi(modmi)`，如果无解则输出 `impossible`。

```java
import java.io.*;

public class Main {
    static int[] x = new int[1];
    static int[] y = new int[1];
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int n = Integer.valueOf(br.readLine());
        while (n -- > 0) {
            String[] ss = br.readLine().split(" ");
            int a = Integer.valueOf(ss[0]), b = Integer.valueOf(ss[1]), m = Integer.valueOf(ss[2]);
            int d = exgcd(a, m, x, y);
            if (b % d != 0) System.out.println("impossible");
            else System.out.println((long)x[0] * (b / d) % m);
        }
    }
    static int exgcd(int a, int b, int[] x, int[] y) {
        if (b == 0) {
            x[0] = 1; y[0] = 0;
            return a;
        }
        int d = exgcd(b, a % b, y, x);
        y[0] -= (a / b) * x[0];
        return d;
    }
}
```

## 动态规划

## 贪心算法




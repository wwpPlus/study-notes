---
title: Offer1
date: 2023-11-16 17:26:39
permalink: /pages/4b7495/
---
# 剑指Offer Ⅰ

- [原题链接](https://leetcode.cn/studyplan/coding-interviews/)

## 字符串

### 替换空格

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

![替换空格](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/5.jpg)

```java
class Solution {
    public String replaceSpace(String s) {
        return s.replace(" ", "%20");
    }
}
```

### 左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

![左旋转字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/58.jpg)

```java
class Solution {
    public String reverseLeftWords(String s, int n) {
        return s.substring(n, s.length()) + s.substring(0, n);
    }
}
```

### 有效数字

**有效数字**（按顺序）可以分成以下几个部分：

1. 若干空格
2. 一个 **小数** 或者 **整数**
3. （可选）一个 `'e'` 或 `'E'` ，后面跟着一个 **整数**
4. 若干空格

**小数**（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）
2. 下述格式之一：
   1. 至少一位数字，后面跟着一个点 `'.'`
   2. 至少一位数字，后面跟着一个点 `'.'` ，后面再跟着至少一位数字
   3. 一个点 `'.'` ，后面跟着至少一位数字

**整数**（按顺序）可以分成以下几个部分：

1. （可选）一个符号字符（`'+'` 或 `'-'`）
2. 至少一位数字

部分有效数字列举如下：`["2", "0089", "-0.1", "+3.14", "4.", "-.9", "2e10", "-90E3", "3e+7", "+6e-1", "53.5e93", "-123.456e789"]`

部分无效数字列举如下：`["abc", "1a", "1e", "e3", "99e2.5", "--6", "-+3", "95a54e53"]`

给你一个字符串 `s` ，如果 `s` 是一个 **有效数字** ，请返回 `true` 。

![有效数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/2.jpg)

```java
class Solution {
    public boolean validNumber(String s) {
        s = s.trim();
        if (s.length() == 0) return false;
        char c = s.charAt(0);
        if (c == '+' || c == '-') s = s.substring(1);
        int len = s.length();
        if (len == 0 || s.charAt(0) == '.' && len == 1) return false;
        int dot = 0, e = 0;
        for (int i = 0; i < len; i ++) {
            char t = s.charAt(i);
            if (t >= '0' && t <= '9');
            else if (s.charAt(i) == '.') {
                dot ++;
                if (dot > 1 || e != 0) {
                    return false;
                }
            } else if (t == 'e' || t == 'E') {
                e ++;
                if(i + 1 == len || i == 0 || e > 1 || i == 1 && s.charAt(i - 1) == '.') return false;
                if (s.charAt(i + 1) == '-' || s.charAt(i + 1) == '+') {
                    if (i + 2 == len) return false;
                    i ++;
                }
            } else return false;
        }
        return  true;
    }
}
```

### 把字符串转换成整数

写一个函数 StrToInt，实现把字符串转换成整数这个功能。不能使用 atoi 或者其他类似的库函数。

首先，该函数会根据需要丢弃无用的开头空格字符，直到寻找到第一个非空格的字符为止。

当我们寻找到的第一个非空字符为正或者负号时，则将该符号与之后面尽可能多的连续数字组合起来，作为该整数的正负号；假如第一个非空字符是数字，则直接将其与之后连续的数字字符组合起来，形成整数。

该字符串除了有效的整数部分之后也可能会存在多余的字符，这些字符可以被忽略，它们对于函数不应该造成影响。

注意：假如该字符串中的第一个非空格字符不是一个有效整数字符、字符串为空或字符串仅包含空白字符时，则你的函数不需要进行转换。

在任何情况下，若函数不能进行有效的转换时，请返回 0。

**说明**：

假设我们的环境只能存储 32 位大小的有符号整数，那么其数值范围为 `[−231,  231 − 1]`。如果数值超过这个范围，请返回  `INT_MAX (231 − 1) 或 INT_MIN (−231)`。

![把字符串转换成整数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/67.jpg)

```java
class Solution {
    public int strToInt(String str) {
        str = str.trim();
        if (str.isEmpty()) {
            return 0;
        }
        int sign = 1;
        int i = 0;
        if (str.charAt(0) == '-' || str.charAt(0) == '+') {
            sign = str.charAt(0) == '-' ? -1 : 1;
            i++;
        }

        long res = 0;
        while (i < str.length() && Character.isDigit(str.charAt(i))) {
            int digit = str.charAt(i) - '0';
            res = res * 10 + digit;
            if (res > Integer.MAX_VALUE) {
                return sign == -1 ? Integer.MIN_VALUE : Integer.MAX_VALUE;
            }
            i++;
        }

        return (int) (sign * res);
    }
}
```

## 链表

### 从尾到头打印链表

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

![从尾到头打印链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/6.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public int[] reversePrint(ListNode head) {
        List<Integer> res = new ArrayList<>();
        dfs(head, res);
        int[] ans = new int[res.size()];
        for (int i = 0; i < res.size(); i ++) {
            ans[i] = res.get(i);
        }
        return ans;
    }
    void dfs(ListNode root, List<Integer> res) {
        if (root == null) {
            return;
        }
        dfs(root.next, res);
        res.add(root.val);
    }
}
```

### 反转链表

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

![反转链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/24.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        var dummy = new ListNode(-1);
        dummy.next = null;
        var p = head;
        while (p != null) {
            var q = p.next;
            p.next = dummy.next;
            dummy.next = p;
            p = q;
        }
        return dummy.next;
    }
}
```

### 复杂链表的复制

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

![复杂链表的复制](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/35.jpg)

```java
/*
// Definition for a Node.
class Node {
    int val;
    Node next;
    Node random;

    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}
*/
class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) {
            return null;
        }
        var p = head;
        while (p != null) {
            var t = new Node(p.val);
            var pt = p.next;
            p.next = t;
            t.next = pt;
            p = pt;
        }
        p = head;
        while (p != null) {
            if (p.random != null) {
                p.next.random = p.random.next;
            }
            p = p.next.next;
        }
        p = head;
        var dummy = new Node(-1);
        var t = dummy;
        while (p != null) {
            t.next = p.next;
            t = p.next;
            p.next = p.next.next;
            p = p.next;
        }
        return dummy.next;
    }
}
```

## 双指针

### 删除链表的节点

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

> 注意：此题对比原题有改动

![删除链表的节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/18.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode deleteNode(ListNode head, int val) {
        var p = head;
        var prev = new ListNode(-1);
        while (p != null) {
            if (p.val == val) {
                break;
            }
            prev = p;
            p = p.next;
        }
        if (prev.next == null) {
            head = head.next;
        } else {
            prev.next = prev.next.next;
        }
        return head;
    }
}
```

### 链表中倒数第k个节点

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 6 个节点，从头节点开始，它们的值依次是 `1、2、3、4、5、6`。这个链表的倒数第 3 个节点是值为 4 的节点。

![链表中倒数第k个节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/22.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        var p = head;
        while (k -- > 0) {
            p = p.next;
        }
        var q = head;
        while (p != null) {
            p = p.next;
            q = q.next;
        }
        return q;
    }
}
```

### 合并两个排序的链表

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

![合并两个排序的链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/25.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        var dummy = new ListNode(-1);
        ListNode p = l1, q = l2, pt = dummy;
        while (p != null && q != null) {
            if (p.val > q.val) {
                pt.next = q;
                q = q.next;
                pt = pt.next;
            } else {
                pt.next = p;
                p = p.next;
                pt = pt.next;
            }
        }
        while (p != null) {
            pt.next = p;
            p = p.next;
            pt = pt.next;
        }
        while (q != null) {
            pt.next = q;
            q = q.next;
            pt = pt.next;
        }
        pt.next = null;
        return dummy.next;
    }
}
```

### 两个链表的第一个公共节点

输入两个链表，找出它们的第一个公共节点。

![两个链表的第一个公共节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/52.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
class Solution {
    ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode p = headA, q = headB, t = headA;
        
        while (p != null && q != null) {
            p = p.next;
            q = q.next;
        }
        if (p == null) {
            t = q;
            p = headA;
            q = headB;
        }
        if (q == null) {
            t = p;
            p = headB;
            q = headA;
        }
        while (t != null && q != null) {
            t = t.next;
            q = q.next;
        }
        while (p != q) {
            p = p.next;
            q = q.next;
        }
        return p;
    }
}
```

### 调整数组顺序使奇数位于偶数前面

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数在数组的前半部分，所有偶数在数组的后半部分。

![调整数组顺序使奇数位于偶数前面](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/21.jpg)

```java
class Solution {
    public int[] exchange(int[] nums) {
        int i = 0, j = nums.length - 1;
        while (i < j) {
            while (i < j && nums[i] % 2 == 1) i ++;
            while (i < j && nums[j] % 2 == 0) j --;
            if (i < j) {
                int t = nums[i];
                nums[i] = nums[j];
                nums[j] = t;
            }
        }
        return nums;
    }
}
```

### 和为s的两个数字

输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得它们的和正好是s。如果有多对数字的和等于s，则输出任意一对即可。

![和为s的两个数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/57.jpg)

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0, j = nums.length - 1; i < j;) {
            int x = nums[i] + nums[j];
            if (x > target) {
                j --;
            } else if (x < target) {
                i ++;
            } else {
                return new int[]{nums[i], nums[j]};
            }
        }
        return new int[0];
    }
}
```

### 翻转单词顺序

输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串`"I am a student. "`，则输出`"student. a am I"`。

![翻转单词顺序](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/77.jpg)

```java
class Solution {
    public String reverseWords(String s) {
        s = s.trim();
        String res = "";
        for (int i = 0; i < s.length(); i ++) {
            StringBuilder sb = new StringBuilder(" ");
            int j = i;
            while (j < s.length() && s.charAt(j) != ' ') {
                sb.append(s.charAt(j));
                j ++;
            }
            while (j < s.length() && s.charAt(j) == ' ') {
                j ++;
            }
            res = sb + res;
            i = j - 1;
        }
        return res.trim();
    }
    // 利用语言特性
    // public String reverseWords(String s) {
    //     // 除去开头和末尾的空白字符
    //     s = s.trim();
    //     // 正则匹配连续的空白字符作为分隔符分割
    //     List<String> wordList = Arrays.asList(s.split("\\s+"));
    //     Collections.reverse(wordList);
    //     return String.join(" ", wordList);
    // }
}
```

### 最长不含重复字符的子字符串

请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。

![最长不含重复字符的子字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/1697279811661.jpg)

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int n = s.length(), res = 0;
        int[] h = new int[160];
        for (int i = 0, j = 0; i < n; i ++) {
            h[s.charAt(i)] ++;
            while (j < n && h[s.charAt(i)] > 1) {
                h[s.charAt(j)] --;
                j ++;
            }
            res = Math.max(res, i - j + 1);
        }
        return res;
    }
}
```

## 栈与队列

### 用两个栈实现队列

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 appendTail 和 deleteHead ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，deleteHead 操作返回 -1 )

![用两个栈实现队列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/9.jpg)

```java
class CQueue {
    Stack<Integer> stk, cache;
    public CQueue() {
        stk = new Stack<Integer>();
        cache = new Stack<Integer>();
    }
    
    void copy(Stack<Integer> stk1, Stack<Integer> stk2) {
        while (!stk1.isEmpty()) {
            stk2.push(stk1.pop());
        }
    }

    public void appendTail(int value) {
        stk.push(value);
    }
    
    public int deleteHead() {
        if (stk.isEmpty()) {
            return -1;
        }
        copy(stk, cache);
        int res = cache.pop();
        copy(cache, stk);
        return res;
    }
}

/**
 * Your CQueue object will be instantiated and called as such:
 * CQueue obj = new CQueue();
 * obj.appendTail(value);
 * int param_2 = obj.deleteHead();
 */
```

### 包含min函数的栈

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

![包含min函数的栈](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/30.jpg)

```java
class MinStack {

    Stack<Integer> minstk, stk;
    /** initialize your data structure here. */
    public MinStack() {
        stk = new Stack<>();
        minstk = new Stack<>();
        minstk.push(Integer.MAX_VALUE);
    }
    
    public void push(int x) {
        stk.push(x);
        minstk.push(Math.min(x, minstk.peek()));
    }
    
    public void pop() {
        stk.pop();
        minstk.pop();
    }
    
    public int top() {
        return stk.peek();
    }
    
    public int min() {
        return minstk.peek();
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(x);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.min();
 */
```

### 滑动窗口的最大值

给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

![滑动窗口的最大值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/59.jpg)

```java
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length, hh = 0, tt = -1, j = 0;
        int[] q = new int[n], res = new int[n];
        for (int i = 0; i < n; i ++) {
            if (hh <= tt && q[hh] < i - k + 1) {
                hh ++;
            }
            while (hh <= tt && nums[q[tt]] <= nums[i]) tt --;
            q[++ tt] = i;
            if (i >= k - 1) {
                res[j ++] = nums[q[hh]];
            }
        }
        return Arrays.copyOf(res, j);
    }
}
```

![Arrays.copyOf()](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/Arrays.copyOf().jpg)

### 队列的最大值

请定义一个队列并实现函数 `max_value` 得到队列里的最大值，要求函数`max_value、push_back 和 pop_front` 的均摊时间复杂度都是O(1)。

若队列为空，`pop_front 和 max_value` 需要返回 -1

![队列的最大值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/59_2.jpg)

```java
class MaxQueue {

    Deque<Integer> d;
    Queue<Integer> q;
    public MaxQueue() {
        d = new LinkedList<>();
        q = new LinkedList<>();
    }
    
    public int max_value() {
        if (d.isEmpty()) {
            return -1;
        }
        return d.peekFirst();
    }
    
    public void push_back(int value) {
        while (!d.isEmpty() && d.peekLast() < value) {
            d.pollLast();
        }
        d.offerLast(value);
        q.offer(value);
    }
    
    public int pop_front() {
        if (q.isEmpty()) {
            return -1;
        }
        int ans = q.poll();
        if (ans == d.peekFirst()) {
            d.pollFirst();
        }
        return ans;
    }
}

/**
 * Your MaxQueue object will be instantiated and called as such:
 * MaxQueue obj = new MaxQueue();
 * int param_1 = obj.max_value();
 * obj.push_back(value);
 * int param_3 = obj.pop_front();
 */
```

## 模拟

### 顺时针打印矩阵

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

![顺时针打印矩阵](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/29.jpg)

```java
class Solution {
    public int[] spiralOrder(int[][] matrix) {
        int n = matrix.length;
        if (n == 0) {
            return new int[0];
        }
        int m = matrix[0].length;
        if (m == 0) {
            return new int[0];
        }
        int[] dx = new int[]{0, 1, 0, -1}, dy = new int[]{1, 0, -1, 0};
        int[] res = new int[n * m];
        for (int i = 0, k = 0, x = 0, y = 0, d = 0; i < n * m; i ++) {
            res[k ++] = matrix[x][y];
            matrix[x][y] = Integer.MAX_VALUE;
            int a = x + dx[d], b = y + dy[d];
            if (a < 0 || a >= n || b < 0 || b >= m || matrix[a][b] == Integer.MAX_VALUE) {
                d = (d + 1) % 4;
                a = x + dx[d]; b = y + dy[d];
            }
            x = a; y = b;
        }
        return res;
    }
}
```

### 栈的压入、弹出序列

输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列 {1,2,3,4,5} 是某栈的压栈序列，序列 {4,5,3,2,1} 是该压栈序列对应的一个弹出序列，但 {4,3,5,1,2} 就不可能是该压栈序列的弹出序列。

![栈的压入、弹出序列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/31.jpg)

```java
class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        int n = pushed.length;
        Stack<Integer> stk = new Stack<>();
        for (int i = 0, j = 0; i < n; i ++) {
            stk.push(pushed[i]);
            while (!stk.isEmpty() && stk.peek() == popped[j]) {
                stk.pop();
                j ++;
            }
        }
        return stk.isEmpty();
    }
}
```

## 查找算法

### 数组中重复的数字

找出数组中重复的数字。

在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

![数组中重复的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/3.jpg)

```java
class Solution {
    public int findRepeatNumber(int[] nums) {
        Set<Integer> hash = new HashSet<>();
        for (int x : nums) {
            if (hash.contains(x)) {
                return x;
            }
            hash.add(x);
        }
        return 0;
    }
}
```

### 在排序数组中查找数字 I

统计一个数字在排序数组中出现的次数。

![在排序数组中查找数字 I](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/53.jpg)

```java
class Solution {
    public int search(int[] nums, int target) {
        int l = 0, r = nums.length - 1;
        while (l < r) {
            int mid = (r + l) / 2;
            if (nums[mid] < target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        int res = 0;
        while (r >= 0 && r < nums.length && nums[r] == target) {
            res ++;
            r ++;
        }
        return res;
    }
}
```

### 0～n-1中缺失的数字

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

![0～n-1中缺失的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/53_2.jpg)

```java
class Solution {
    public int missingNumber(int[] nums) {
        int i = 0;
        for (; i < nums.length; i ++) {
            if (nums[i] != i) {
                return i;
            }
        }
        return i;
    }
}
```

### 二维数组中的查找

在一个 n * m 的二维数组中，每一行都按照从左到右 `非递减` 的顺序排序，每一列都按照从上到下 `非递减` 的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

![二维数组中的查找](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/4.jpg)

```java
class Solution {
    public boolean findNumberIn2DArray(int[][] matrix, int target) {
        int n = matrix.length;
        if (n == 0) {
            return false;
        }
        int m = matrix[0].length;
        if (m == 0) {
            return false;
        }
        int i = 0, j = m - 1;
        while (i < n && j >= 0) {
            if (matrix[i][j] == target) {
                return true;
            }
            if (matrix[i][j] > target) {
                j --;
            } else {
                i ++;
            }
        }
        return false;
    }
}
```

### 旋转数组的最小数字

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 `[3,4,5,1,2] 为 [1,2,3,4,5]` 的一次旋转，该数组的最小值为 1。  

注意，数组 `[a[0], a[1], a[2], ..., a[n-1]]` 旋转一次 的结果为数组 `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]` 。

![旋转数组的最小数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/11.jpg)

```java
class Solution {
    // 方法一：暴力法
    public int minArray(int[] numbers) {
        int n = numbers.length, res = numbers[0];
        for (int i = 1; i < n; i ++) {
            if (numbers[i - 1] > numbers[i]) {
                res = numbers[i];
                break;
            }
        }
        return res;
    }
    // 二分法
    public int minArray(int[] nums) {
        int n = nums.length - 1;
        while (n > 0 && nums[n] == nums[0]) n --;
        if (nums[n] >= nums[0]) {
            return nums[0];
        }
        int l = 0, r = n;
        while (l < r) {
            int mid = l + r >> 1;
            if (nums[mid] < nums[0]) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }
        return nums[r];
    }
}
```

### 第一个只出现一次的字符

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

![第一个只出现一次的字符](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/50.jpg)

```java
class Solution {
    public char firstUniqChar(String s) {
        int[] h = new int[26];
        for (char c : s.toCharArray()) {
            h[c - 'a'] ++;
        }
        for (char c : s.toCharArray()) {
            if (h[c - 'a'] == 1) {
                return c;
            }
        }
        return ' ';
    }
}
```

## 搜索与回溯算法

### 从上到下打印二叉树Ⅰ

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

![从上到下打印二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/32.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int[] levelOrder(TreeNode root) {
        if (root == null) {
            return new int[0];
        }
        List<Integer> path = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            var cur = queue.poll();
            path.add(cur.val);
            if (cur.left != null) {
                queue.offer(cur.left);
            }
            if (cur.right != null) {
                queue.offer(cur.right);
            }
        }
        int[] res = new int[path.size()];
        for (int i = 0; i < path.size(); i ++) {
            res[i] = path.get(i);
        }
        return res;
    }
}
```

### 从上到下打印二叉树Ⅱ

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

![从上到下打印二叉树II](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/32_1.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        List<Integer> path = new ArrayList<>();
        Queue<TreeNode> queue1 = new LinkedList<>();
        Queue<TreeNode> queue2 = new LinkedList<>();
        queue1.offer(root);
        while (!queue1.isEmpty()) {
            var cur = queue1.poll();
            path.add(cur.val);
            if (cur.left != null) {
                queue2.offer(cur.left);
            }
            if (cur.right != null) {
                queue2.offer(cur.right);
            }
            if (queue1.isEmpty()) {
                queue1 = queue2;
                queue2 = new LinkedList<>();
                res.add(path);
                path = new ArrayList<>();
            }
        }
        return res;
    }
}
```

### 从上到下打印二叉树 Ⅲ

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

![从上到下打印二叉树 Ⅲ](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/32_2.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) {
            return res;
        }
        boolean flag = false;
        List<Integer> path = new ArrayList<>();
        Queue<TreeNode> queue1 = new LinkedList<>();
        Queue<TreeNode> queue2 = new LinkedList<>();
        queue1.offer(root);
        while (!queue1.isEmpty()) {
            var cur = queue1.poll();
            path.add(cur.val);
            if (cur.left != null) {
                queue2.offer(cur.left);
            }
            if (cur.right != null) {
                queue2.offer(cur.right);
            }
            if (queue1.isEmpty()) {
                queue1 = queue2;
                queue2 = new LinkedList<>();
                if (flag) {
                    Collections.reverse(path);
                }
                flag = !flag;
                res.add(path);
                path = new ArrayList<>();
            }
        }
        return res;
    }
}
```

### 树的子结构

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

![树的子结构](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/26.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSubStructure(TreeNode A, TreeNode B) {
        if (A == null || B == null) {
            return false;
        }
        if (dfs(A, B)) {
            return true;
        }
        return isSubStructure(A.left, B) || isSubStructure(A.right, B);
    }
    boolean dfs(TreeNode p, TreeNode q) {
        if (q == null) {
            return true;
        }
        if (p == null || p.val != q.val) {
            return false;
        }
        return dfs(p.left, q.left) && dfs(p.right, q.right);
    }
}
```

### 二叉树的镜像

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

![二叉树的镜像](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/27.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode mirrorTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        TreeNode left = mirrorTree(root.left), right = mirrorTree(root.right);
        root.left = right;
        root.right = left;
        return root;
    }
}
```

### 对称的二叉树

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

![对称的二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/28.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public boolean isSymmetric(TreeNode root) {
        if (root == null) {
            return true;
        }
        return dfs(root.left, root.right);
    }
    boolean dfs(TreeNode p1, TreeNode p2) {
        if (p1 == null || p2 == null) {
            return p1 == null && p2 == null;
        }
        if (p1.val != p2.val) {
            return false;
        }
        return dfs(p1.left, p2.right) && dfs(p1.right, p2.left);
    }
}
```

### 矩阵中的路径

给定一个` m x n` 二维字符网格 `board` 和一个字符串单词 `word` 。如果 `word` 存在于网格中，返回 `true` ；否则，返回 `false` 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

![矩阵中的路径](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/12.jpg)

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        int n = board.length, m = board[0].length;
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j < m; j ++) {
                if (dfs(board, word, 0, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }
    boolean dfs(char[][] board, String word, int u, int i, int j) {
        if (board[i][j] != word.charAt(u)) {
            return false;
        } else if (u == word.length() - 1) {
            return true;
        }
        char temp = board[i][j];
        board[i][j] = '*';
        boolean res = false;
        int[] dx = new int[]{0, 1, 0, -1}, dy = new int[]{1, 0, -1, 0};
        for (int k = 0; k < 4; k ++) {
            int x = i + dx[k], y = j + dy[k];
            if (x >= 0 && x < board.length && y >= 0 && y < board[0].length && board[x][y] != '*') {
                res = dfs(board, word, u + 1, x, y);
                if (res) {
                    break;
                }
            }
        }
        board[i][j] = temp;
        return res;
    }
}
```

### 机器人的运动范围

地上有一个m行n列的方格，从坐标 `[0,0]` 到坐标 `[m-1,n-1] `。一个机器人从坐标 `[0, 0]` 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 `[35, 37] `，因为`3+5+3+7=18`。但它不能进入方格 `[35, 38]`，因为`3+5+3+8=19`。请问该机器人能够到达多少个格子？

![机器人的运动范围](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/13.jpg)

```java
class Solution {
    int res = 0;
    boolean[][] st;
    public int movingCount(int m, int n, int k) {
        st = new boolean[m][n];
        dfs(m, n, k, 0, 0);
        return res;
    }
    int getSum(int x) {
        int sum = 0;
        while (x != 0) {
            sum += x % 10;
            x /= 10;
        }
        return sum;
    }
    boolean check(int i, int j, int k) {
        return getSum(i) + getSum(j) <= k;
    }
    void dfs(int n, int m, int k, int i, int j) {
        st[i][j] = true;
        if (check(i, j, k)) {
            res ++;
        } else {
            return;
        }
        int[] dx = new int[]{1, 0, -1, 0}, dy = new int[]{0, 1, 0, -1};
        for (int d = 0; d < 4; d ++) {
            int x = i + dx[d], y = j + dy[d];
            if (x >= 0 && x < n && y >= 0 && y < m && !st[x][y]) {
                dfs(n, m, k, x, y);
            }
        }
    }
}
```

### 二叉树中和为某一值的路径

给你二叉树的根节点 `root` 和一个整数目标和 `targetSum` ，找出所有 `从根节点到叶子节点` 路径总和等于给定目标和的路径。

**叶子节点** 是指没有子节点的节点。

![二叉树中和为某一值的路径](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/34.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    List<List<Integer>> ans = new ArrayList<>();
    List<Integer> path = new ArrayList<>();
    public List<List<Integer>> pathSum(TreeNode root, int target) {
        dfs(root, target);
        return ans;
    }
    void dfs(TreeNode root, int target) {
        if (root == null) {
            return;
        }
        path.add(root.val);
        target -= root.val;
        if (root.left == null && root.right == null && target == 0) {
            ans.add(new ArrayList<>(path));
        }
        dfs(root.left, target);
        dfs(root.right, target);
        path.remove(path.size() - 1);
    }
}
```

### 将二叉搜索树转化为排序的双向链表

将一个 **二叉搜索树** 就地转化为一个 **已排序的双向循环链表** 。

对于双向循环列表，你可以将左右孩子指针作为双向循环链表的前驱和后继指针，第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。

特别地，我们希望可以 **就地** 完成转换操作。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继。还需要返回链表中最小元素的指针。

![将二叉搜索树转化为排序的双向链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/8.jpg)

**算法流程**：
`dfs(cur):` 递归法中序遍历；

1. **终止条件**： 当节点 `cur` 为空，代表越过叶节点，直接返回；
2. 递归左子树，即 `dfs(cur.left)` ；
3. **构建链表**：
   - **当 `pre` 为空时**： 代表正在访问链表头节点，记为 `head` ；
   - **当 `pre` 不为空时**： 修改双向节点引用，即 `pre.right = cur` ， `cur.left = pre` ；
   - **保存 `cur` **： 更新 `pre = cur` ，即节点 `cur` 是后继节点的 `pre` ；
4. 递归右子树，即 `dfs(cur.right)` ；

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val,Node _left,Node _right) {
        val = _val;
        left = _left;
        right = _right;
    }
};
*/
class Solution {
    Node pre, head;
    public Node treeToDoublyList(Node root) {
        if (root == null) return null;
        dfs(root);
        head.left = pre;
        pre.right = head;
        return head;
    }
    void dfs(Node cur) {
        if (cur == null) return;
        dfs(cur.left);
        if (pre != null) {
            pre.right = cur;
        } else {
            head = cur;
        }
        cur.left = pre;
        pre = cur;
        dfs(cur.right);
    }
}
```

### 二叉搜索树的第k大节点

给定一棵二叉搜索树，请找出其中第 `k` 大的节点的值。

![二叉搜索树的第k大节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/54.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    int res, u;
    public int kthLargest(TreeNode root, int k) {
        u = k;
        dfs(root);
        return res;
    }
    void dfs(TreeNode root) {
        if (root == null) {
            return;
        }
        dfs(root.right);
        if (u == 0) {
            return;
        }
        if (-- u == 0) {
            res = root.val;
        }
        dfs(root.left);
    }
}
```

### 二叉树的深度

输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

![二叉树的深度](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/55.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return Math.max(left, right) + 1;
    }
}
```

### 平衡二叉树

输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

![平衡二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/55_1.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    boolean ans = true;
    public boolean isBalanced(TreeNode root) {
        dfs(root);
        return ans;
    }
    int dfs(TreeNode root) {
        if (root == null) {
                return 0;
        }
        int left = dfs(root.left), right = dfs(root.right);
        if (Math.abs(left - right) > 1) {
            ans = false;
        }
        return Math.max(left, right) + 1;
    }
}
```

### 求1+2+…+n

求 `1+2+...+n` ，要求不能使用乘除法、`for、while、if、else、switch、case`等关键字及条件判断语句`（A?B:C）`。

![求1+2+…+n](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/64.jpg)

```java
class Solution {
    public int sumNums(int n) {
        boolean flag = n > 0 && (n += sumNums(n - 1)) > 0;
        return n;
    }
}
```

### 二叉树的最近公共祖先

给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

最近公共祖先的定义为：“对于有根树 T 的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

![二叉树的最近公共祖先](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/7.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if(root == null) return null;
        if(root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q), right = lowestCommonAncestor(root.right, p, q);
        if(left != null && right != null) return root;
        if(left != null) return left;
        return right;
    }
}
```

### 序列化与反序列化二叉树

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，你只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

**提示:** 输入输出格式与 LeetCode 目前使用的方式一致，详情请参阅 [LeetCode 序列化二叉树的格式](https://leetcode.cn/faq/#binary-tree)。你并非必须采取这种方式，你也可以采用其他的方法解决这个问题。

![序列化与反序列化二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/69.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) return "[]";
        StringBuilder res = new StringBuilder("[");
        Queue<TreeNode> queue = new LinkedList<>() {{ add(root); }};
        while (!queue.isEmpty()) {
            var cur = queue.poll();
            if (cur != null) {
                res.append(cur.val + ",");
                queue.offer(cur.left);
                queue.offer(cur.right);
            } else {
                res.append("null,");
            }
        }
        res.deleteCharAt(res.length() - 1);
        res.append("]");
        return res.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        if (data.equals("[]")) return null;
        String[] strs = data.substring(1, data.length() - 1).split(",");
        TreeNode root = new TreeNode(Integer.parseInt(strs[0]));
        Queue<TreeNode> queue = new LinkedList<>() {{ add(root); }};
        int i = 1;
        while (!queue.isEmpty()) {
            var cur = queue.poll();
            if (!strs[i].equals("null")) {
                cur.left = new TreeNode(Integer.parseInt(strs[i]));
                queue.add(cur.left);
            }
            i ++;
            if (!strs[i].equals("null")) {
                cur.right = new TreeNode(Integer.parseInt(strs[i]));
                queue.add(cur.right);
            }
            i ++;
        }
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));
```

### 字符串的排列

输入一个字符串，打印出该字符串中字符的所有排列。

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

![字符串的排列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/38.jpg)

```java
class Solution {
    boolean[] st;
    List<String> ans = new ArrayList<>();
    public String[] permutation(String s) {
        st = new boolean[s.length()];
        char[] cs = s.toCharArray();
        Arrays.sort(cs);
        dfs(cs, 0, new StringBuffer());
        String[] res = new String[ans.size()];
        for (int i = 0; i < ans.size(); i ++) {
            res[i] = ans.get(i);
        }
        return res;
    }
    void dfs(char[] cs, int u, StringBuffer ts) {
        if (u == cs.length) {
            ans.add(ts.toString());
            return;
        }
        for (int i = 0; i < cs.length; i ++) {
            if (st[i] || i > 0 && st[i - 1] && cs[i - 1] == cs[i]) {
                continue;
            } else {
                st[i] = true;
                ts.append(cs[i]);
                dfs(cs, u + 1, ts);
                ts.deleteCharAt(ts.length() - 1);
                st[i] = false;
            }
        }
    }
}
```

## 分治算法

### 重建二叉树

某二叉树的先序遍历结果记录于整数数组 `preorder`，它的中序遍历结果记录于整数数组 `inorder`。请根据 `preorder` 和 `inorder` 的提示构造出这棵二叉树并返回其根节点。

![重建二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/68.jpg)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    int[] preorder, inorder;
    Map<Integer, Integer> hash;
    TreeNode dfs(int pl, int pr, int il, int ir) {
        if (pl > pr) return null;
        TreeNode res = new TreeNode(preorder[pl]);
        int k = hash.get(res.val);
        res.left = dfs(pl + 1, pl + k - il, il, k - 1);
        res.right = dfs(pl + k - il + 1, pr, k + 1, ir);
        return res;
    }
    public TreeNode deduceTree(int[] preorder, int[] inorder) {
        this.preorder = preorder;
        this.inorder = inorder;
        hash = new HashMap<>();
        int n = inorder.length;
        for (int i = 0; i < n; i ++) {
            hash.put(inorder[i], i);
        }
        return dfs(0, n - 1, 0, n - 1);
    }
}
```

### 数值的整数次方

实现 `pow(x, n)` ，即计算 x 的 n 次幂函数（即，xn）。不得使用库函数，同时不需要考虑大数问题。

![数值的整数次方](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/16.jpg)

```java
class Solution {
    public double myPow(double x, int n) {
        long b = n;
        if (b < 0) {
            b = -b;
            x = 1 / x;   
        }
        double res = 1.0;
        while (b > 0) {
            if ((b & 1) == 1) {
                res *= x;
            }
            x *= x;
            b >>= 1;
        }
        return res;
    }
}
```

### 二叉搜索树的后序遍历序列

输入一个整数数组，判断该数组是不是某二叉搜索树的后序遍历结果。如果是则返回 `true`，否则返回 `false`。假设输入的数组的任意两个数字都互不相同。

![image-20230916181406946](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/33.png)

```java
class Solution {
    public boolean verifyPostorder(int[] postorder) {
        return dfs(0, postorder.length - 1, postorder);
    }
    boolean dfs(int l, int r, int[] seq) {
        if (l >= r) {
            return true;
        }
        int root = seq[r], k = l;
        while (seq[k] < root) {
            k ++;
        }
        while (seq[k] > root) k ++;
        return k == r && dfs(l, k - 1, seq) && dfs(k + 1, r, seq);
    }
}
```

### 打印从1到最大的n位数	

输入数字 `n`，按顺序打印出从 1 到最大的 n 位十进制数。比如输入 3，则打印出 1、2、3 一直到最大的 3 位数 999。

![image-20230916183049427](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/17.png)

```java
class Solution {
    public int[] printNumbers(int n) {
        int x = (int)Math.pow(10, n) - 1;
        int[] res = new int[x];
        for (int i = 0; i < x; i ++) {
            res[i] = i + 1;
        }
        return res;
    }
}
```

###  数组中的逆序对

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

![image-20230916185141182](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/51.png)

```java
class Solution {
    int res = 0;
    int[] temp;
    public int reversePairs(int[] nums) {
        int n = nums.length;
        temp = new int[n];
        mergeSort(nums, 0, n - 1);
        return res;
    }
    void mergeSort(int[] nums, int l, int r) {
        if (l >= r) {
            return;
        }
        int mid = l + r >> 1;
        mergeSort(nums, l, mid);
        mergeSort(nums, mid + 1, r);

        int i = l, j = mid + 1, k = 0;
        while (i <= mid && j <= r) {
            if (nums[i] > nums[j]) {
                res += mid - i + 1;
                temp[k ++] = nums[j ++];
            } else {
                temp[k ++] = nums[i ++];
            }
        }
        while (i <= mid) {
            temp[k ++] = nums[i ++];
        }
        while (j <= r) {
            temp[k ++] = nums[j ++];
        }
        for (i = l, j = 0; i <= r; i ++) {
            nums[i] = temp[j ++];
        }
    }
}
```

## 排序

### 把数组排成最小的数

输入一个非负整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个。

![image-20230916201521680](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/45.png)

```java
class Solution {
    public String minNumber(int[] nums) {
        int n = nums.length;
        String[] strs = new String[n];
         for(int i = 0; i < nums.length; i++){
            strs[i] = String.valueOf(nums[i]);
        }
        // quick_sort(strs, 0, n - 1);
        Arrays.sort(strs, (o1, o2) -> (o1 + o2).compareTo(o2 + o1) > 0 ? 1 : -1);
        StringBuilder res = new StringBuilder();
        for (String x : strs) {
            res.append(x);
        }
        return res.toString();
    }
    void quick_sort(String[] strs, int l, int r) {
        if(l >= r) return;
        int i = l, j = r;
        String tmp = strs[i];
        while(i < j) {
            while((strs[j] + strs[l]).compareTo(strs[l] + strs[j]) >= 0 && i < j) j--;
            while((strs[i] + strs[l]).compareTo(strs[l] + strs[i]) <= 0 && i < j) i++;
            tmp = strs[i];
            strs[i] = strs[j];
            strs[j] = tmp;
        }
        strs[i] = strs[l];
        strs[l] = tmp;
        quick_sort(strs, l, i - 1);
        quick_sort(strs, i + 1, r);
    }
}
```

### 扑克牌中的顺子

从**若干副扑克牌**中随机抽 `5` 张牌，判断是不是一个顺子，即这5张牌是不是连续的。2～10为数字本身，A为1，J为11，Q为12，K为13，而大、小王为 0 ，可以看成任意数字。A 不能视为 14。

![image-20230916202935260](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/61.png)

```java
class Solution {
    public boolean isStraight(int[] nums) {
        Arrays.sort(nums);
        int k = 0;
        while (k < nums.length && nums[k] == 0) k ++;
        for (int i = k + 1; i < nums.length; i ++) {
            if (nums[i] == nums[i - 1]) {
                return false;
            }
        }
        return nums[nums.length - 1] - nums[k] <= 4;
    }
}
```

### 最小的k个数

输入整数数组 `arr` ，找出其中最小的 `k` 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

![image-20230916203340170](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/40.png)

```java
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        Arrays.sort(arr);
        return Arrays.copyOf(arr, k);
    }
}
```

### 数据流中的中位数

如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

例如，

[2,3,4] 的中位数是 3

[2,3] 的中位数是 (2 + 3) / 2 = 2.5

设计一个支持以下两种操作的数据结构：

- `void addNum(int num) `- 从数据流中添加一个整数到数据结构中。
- `double findMedian() `- 返回目前所有元素的中位数。

![image-20230916205250818](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/41.png)

```java
class MedianFinder {
    Queue<Integer> min_heap = new PriorityQueue<>();
    Queue<Integer> max_heap = new PriorityQueue<>((a, b) -> b - a);
    /** initialize your data structure here. */
    public MedianFinder() {

    }
    
    public void addNum(int num) {
        max_heap.offer(num);
        while (!min_heap.isEmpty() && min_heap.peek() < max_heap.peek()) {
            int minv = min_heap.poll(), maxv = max_heap.poll();
            max_heap.offer(minv); min_heap.offer(maxv);
        }
        if (max_heap.size() > min_heap.size() + 1) {
            min_heap.offer(max_heap.poll());
        }
    }
    
    public double findMedian() {
        if ((max_heap.size() + min_heap.size()) % 2 == 0) {
            return (min_heap.peek() + max_heap.peek()) / 2.0;
        } else {
            return max_heap.peek();
        }
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */
```

## 动态规划

### 斐波那契数列

写一个函数，输入 `n` ，求斐波那契（Fibonacci）数列的第 `n` 项（即 `F(N)`）。斐波那契数列的定义如下：

```
F(0) = 0,   F(1) = 1
F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
```

斐波那契数列由 0 和 1 开始，之后的斐波那契数就是由之前的两数相加而得出。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

![image-20230916210222920](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/10.png)

```java
class Solution {
    public int fib(int n) {
        if (n < 2) {
            return n;
        }
        int a = 1, b = 2, c = a + b, MOD = (int)Math.pow(10, 9) + 7;
        while (n -- > 2) {
            a = b;
            b = c;
            c = (a + b) % MOD;
        }
        return a;
    }
}
```

### 青蛙跳台阶问题

一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 `n` 级的台阶总共有多少种跳法。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

![image-20230916211208968](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/10_1.png)

```java
class Solution {
    public int numWays(int n) {
        if (n == 0 || n == 1) {
            return 1;
        }
        int a = 1, b = 2, c = a + b, MOD = (int)Math.pow(10, 9) + 7;
        while (n -- > 1) {
            a = b;
            b = c;
            c = (a + b) % MOD;
        }
        return a;
    }
}
```

### 股票的最大利润

假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？

![股票的最大利润](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/63.jpg)

```java
class Solution {
    public int maxProfit(int[] prices) {
        int max = 0, min = Integer.MAX_VALUE;
        for (int x : prices) {
            if (min > x) {
                min = x;
            } else {
                max = Math.max(max, x - min);
            }
        }
        return max;
    }
}
```

### 连续子数组的最大和

输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

![image-20230919211255699](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/42.jpg)

```java
class Solution {
    public int maxSubArray(int[] nums) {
        int ans = Integer.MIN_VALUE, sum = 0;
        for (int x : nums) {
            sum = Math.max(sum, 0) + x;
            ans = Math.max(ans, sum);
        }
        return ans;
    }
}
```

### 礼物的最大价值

在一个 `m*n` 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格、直到到达棋盘的右下角。给定一个棋盘及其上面的礼物的价值，请计算你最多能拿到多少价值的礼物？

![礼物的最大价值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/47.jpg)

```java
class Solution {
    public int maxValue(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        // int[][] f = new int[n + 1][m + 1];
        // for (int i = 1; i <= n; i ++) {
        //     for (int j = 1; j <= m; j ++) {
        //         f[i][j] = Math.max(f[i - 1][j], f[i][j - 1]) + grid[i - 1][j - 1];
        //     }
        // }
        int[][] f = new int[2][m + 1];
        for (int i = 1; i <= n; i ++) {
            int p = i % 2;
            for (int j = 1; j <= m; j ++) {
                f[p][j] = Math.max(f[p][j - 1], f[1 - p][j]) + grid[i - 1][j - 1];
            }
        }
        return f[n % 2][m];
    }
}
```

### 把数字翻译成字符串

给定一个数字，我们按照如下规则把它翻译为字符串：0 翻译成 “a” ，1 翻译成 `“b”，……，11` 翻译成 `“l”，……，25` 翻译成 “z”。一个数字可能有多个翻译。请编程实现一个函数，用来计算一个数字有多少种不同的翻译方法。

![把数字翻译成字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/46.jpg)

```java
class Solution {
    public int translateNum(int num) {
        String s = String.valueOf(num);
        int n = s.length();
        // int[] f = new int[n + 1];
        // f[0] = 1; f[1] = 1;
        // for (int i = 2; i <= n; i ++) {
        //     f[i] = f[i - 1];
        //     int x = (s.charAt(i - 2) - '0') * 10 + s.charAt(i - 1) - '0';
        //     if (x >= 10 && x <= 25) {
        //         f[i] += f[i - 2];
        //     }
        // }
        // return f[n];
        int a = 1, b = 1;
        for (int i = 2; i <= n; i ++) {
            int x = (s.charAt(i - 2) - '0') * 10 + s.charAt(i - 1) - '0';
            int c = b;
            if (x >= 10 && x <= 25) {
                c = a + b;
            }
            a = b;
            b = c;
        }
        return b;
    }
}
```

### 正则表达式匹配

请设计一个程序来支持用户在文本编辑器中的模糊搜索功能。用户输入内容中可能使用到如下两种通配符：
- `'.'` 匹配任意单个字符。
- `'*'` 匹配零个或多个前面的那一个元素。

请返回用户输入内容 `input` 所有字符是否可以匹配原文字符串 `article`。

![正则表达式匹配](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/1.jpg)

```java
class Solution {
    public boolean articleMatch(String s, String p) {
        int n = s.length(), m = p.length();
        s = " " + s; p = " " + p;
        boolean[][] f = new boolean[n + 1][m + 1];
        f[0][0] = true;
        for (int i = 0; i <= n; i ++) {
            for (int j = 1; j <= m; j ++) {
                if(j + 1 < m && p.charAt(j + 1) == '*') continue;
                if(i != 0 && p.charAt(j) != '*') 
                    f[i][j] = f[i - 1][j - 1] && (s.charAt(i) == p.charAt(j) || p.charAt(j) == '.');
                else if(p.charAt(j) == '*')
                    f[i][j] = f[i][j - 2] || i != 0 && f[i - 1][j] && (s.charAt(i) == p.charAt(j - 1) || p.charAt(j - 1) == '.');
            }
        }
        return f[n][m];
    }
}
```

### 丑数

我们把只包含质因子 2、3 和 5 的数称作丑数（Ugly Number）。求按从小到大的顺序的第 n 个丑数。

![丑数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/49.jpg)

```java
class Solution {
    public int nthUglyNumber(int n) {
        int[] f = new int[n];
        f[0] = 1;
        int i = 0, j = 0, k = 0, v = 0;
        while (-- n > 0) {
            int x = Math.min(f[i] * 2, Math.min(f[j] * 3, f[k] * 5));
            f[++ v] = x;
            if (x == f[i] * 2) i ++;
            if (x == f[j] * 3) j ++;
            if (x == f[k] * 5) k ++;
        }
        return f[v];
    }
}
```

### n个骰子的点数

把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。

你需要用一个浮点数数组返回答案，其中第 i 个元素代表这 n 个骰子所能掷出的点数集合中第 i 小的那个的概率。

![n个骰子的点数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/60.jpg)

```java
class Solution {
    public double[] dicesProbability(int n) {
        /**
        数组f[i][j]表示用i个骰子扔出和为j的可能数，
        因为第i个骰子可能扔出1-6的点数，则
        f[i][j]=f[i-1][j-1]+f[i-1][j-2]+f[i-1][j-3]+f[i-1][j-4]+f[i-1][j-5]+f[i-1][j-6]
        */
        int[][] f = new int[n + 1][6 * n + 1];
        f[0][0] = 1;
        for (int i = 1; i <= n; i ++) {
            for (int j = 1; j <= 6 * i; j ++) {
                for (int k = 1; k <= Math.min(j, 6); k ++) {
                    f[i][j] += f[i - 1][j - k];
                }
            }
        }
        double sum = 0;
        double[] res = new double[5 * n + 1];
        for (int i = n; i <= 6 * n; i ++) {
            res[i - n] = f[n][i] * 1.0;
            sum += res[i - n];
        }
        if (sum == 0) {
            sum = 1.0;
        }
        for (int i = n; i <= 6 * n; i ++) {
            res[i - n] = res[i - n] / sum;
        }

        return res;

        // 优化空间
        // double[] f = new double[6];
        // Arrays.fill(f, 1.0 / 6.0);
        // for (int i = 2; i <= n; i ++) {
        //     double[] temp = new double[5 * i + 1];
        //     for (int j = 0; j < f.length; j ++) {
        //         for (int k = 0; k < 6; k ++) {
        //             temp[j + k] += f[j] / 6.0;
        //         }
        //     }
        //     f = temp;
        // }
        // return f;
    }
}
```

## 位运算

### 二进制中1的个数

编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为 [汉明重量](http://en.wikipedia.org/wiki/Hamming_weight)).）。

**提示**：

- 请注意，在某些语言（如 Java）中，没有无符号整数类型。在这种情况下，输入和输出都将被指定为有符号整数类型，并且不应影响您的实现，因为无论整数是有符号的还是无符号的，其内部的二进制表示形式都是相同的。
- 在 Java 中，编译器使用 [二进制补码](https://baike.baidu.com/item/二进制补码/5295284) 记法来表示有符号整数。因此，在上面的 **示例 3** 中，输入表示有符号整数 `-3`。

![二进制中1的个数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/15.jpg)

```java
public class Solution {
    // you need to treat n as an unsigned value
    public int hammingWeight(int n) {
        int res = 0;
        while (n != 0) {
            n &= n - 1;
            res ++;
        }
        return res;
    }
}
```

### 不用加减乘除做加法

写一个函数，求两个整数之和，要求在函数体内不得使用 `“+”、“-”、“*”、“/”` 四则运算符号。

![不用加减乘除做加法](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/65.jpg)

```java
class Solution {
    public int add(int a, int b) {
        while (b != 0) {
            int sum = a ^ b;
            int carry = (a & b) << 1;
            a = sum;
            b = carry;
        }
        return a;
    }
}
```

### 数组中数字出现的次数 Ⅰ

给你一个 **非空** 整数数组 `nums` ，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法来解决此问题，且该算法只使用常量额外空间。

![数组中数字出现的次数1](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/56_1.jpg)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for(int i = 0; i < nums.length; i ++){
            res ^= nums[i];
        }
        return res;
    }
}
```

### 数组中数字出现的次数 Ⅱ

给你一个整数数组 `nums` ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

你必须设计并实现线性时间复杂度的算法且使用常数级空间来解决此问题。

**思路**： 按位统计

![数组中数字出现的次数2](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/56_2.jpg)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int i = 0; i < 32; i ++) {
            int cnt = 0;
            for (int x : nums) {
                cnt += (x >> i & 1);
            }
            if (cnt % 3 != 0) {
                res |= (1 << i);
            }
        }
        return res;
    }
}
```

### 数组中数字出现的次数 Ⅲ

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是O(n)，空间复杂度是O(1)。

![数组中数字出现的次数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/56.jpg)

**思路**：
如果我们可以把所有数字分成两组，使得：

- 两个只出现一次的数字在不同的组中；
- 相同的数字会被分到相同的组中。

那么对两个组分别进行异或操作，即可得到答案的两个数字。这是**解决这个问题的关键**。

记这两个只出现了一次的a 和 b，那么所有数字异或的结果就等于 a 和 b 异或的结果，我们记为 x，把 x 写成二进制的形式 `xkxk−1⋯x2x1x0`。

由此可以推断出ai和bi的关系

`xi=0 表示 ai = bi，xi = 1 表示 ai != bi`，那么按照该位 为0的分到一组，为1的分到一组就可以满足上述两个条件。

```java
class Solution {
    public int[] singleNumbers(int[] nums) {
        int res = 0;
        for (int x : nums) {
            res ^= x;
        }
        int div = 1;
        while ((div & res) == 0) {
            div <<= 1;
        }
        int a = 0, b = 0;
        for (int x : nums) {
            if ((div & x) != 0) {
                a ^= x;
            } else {
                b ^= x;
            }
        }
        return new int[]{a, b};
    }
}
```

### 数组中数字出现的次数 Ⅳ

在一个数组 `nums` 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

![数组中数字出现的次数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/56_3.jpg)

```java
class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int i = 0; i < 32; i ++) {
            int cnt = 0;
            for (int x : nums) {
                cnt += x >> i & 1;
            }
            if (cnt % 3 != 0) {
                res |= 1 << i;
            }
        }
        return res;
    }
}
```

### 数组中出现次数超过一半的数字

数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。
你可以假设数组是非空的，并且给定的数组总是存在多数元素。

![数组中出现次数超过一半的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/39.jpg)

```java
class Solution {
    public int majorityElement(int[] nums) {
        int res = nums[0], cnt = 0;
        for (int x : nums) {
            if (x != res) {
                cnt --;
                if (cnt == 0) {
                    res = x;
                    cnt = 1;
                }
            } else {
                cnt ++;
            }
        }
        return res;
    }
}
```

### 构建乘积数组

给定一个数组 `A[0,1,…,n-1]`，请构建一个数组 `B[0,1,…,n-1]`，其中 `B[i]` 的值是数组 A 中除了下标 i 以外的元素的积, 即 `B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]`。不能使用除法。

![构建乘积数组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/66.jpg)

```java
class Solution {
    public int[] constructArr(int[] a) {
        int n = a.length;
        if (n == 0) {
            return new int[0];
        }
        int[] left = new int[n], right = new int[n];
        left[0] = 1; right[n - 1] = 1;
        for (int i = 1; i < n; i ++) {
            left[i] = a[i - 1] * left[i - 1];
        }
        for (int i = n - 2; i >= 0; i --) {
            right[i] = right[i + 1] * a[i + 1];
        }
        int[] ans = new int[n];
        for (int i = 0; i < n; i ++) {
            ans[i] = left[i] * right[i];
        }
        return ans;
    }
}
```

### 剪绳子Ⅰ

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m-1]` 。请问 `k[0]*k[1]*...*k[m-1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

![剪绳子1](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/14.jpg)

```java
class Solution {
    public int integerBreak(int n) {
        int res = 1;
        if (n <= 3) return n - 1;
        while (n % 3 != 0) {
            res *= 2;
            n -= 2;
        }
        while (n > 0) {
            res *= 3;
            n -= 3;
        }
        return res;
    }
}
```

### 剪绳子Ⅱ

给你一根长度为 n 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m - 1]` 。请问 `k[0]*k[1]*...*k[m - 1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2、3、3的三段，此时得到的最大乘积是18。

答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。

![剪绳子2](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/14_1.jpg)

```java
class Solution {
    public int cuttingRope(int n) {
        long res = 1;
        final int MOD = (int)Math.pow(10, 9) + 7;
        if (n <= 3) return n - 1;
        while (n % 3 != 0) {
            n -= 2;
            res = (res * 2) % MOD;
        }
        while (n > 0) {
            n -= 3;
            res = (res * 3) % MOD;
        }
        return (int)res;
    }
}
```

### 和为s的连续正数序列

输入一个正整数 `target` ，输出所有和为 `target` 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

![和为s的连续正数序列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/57_1.jpg)

```java
class Solution {
    public int[][] findContinuousSequence(int target) {
        List<int[]> ans = new ArrayList<>();
        for (int i = 1, j = 1, s = 1; i <= target; i ++) {
            while (s < target) s += ++ j;
            if (s == target && j - i > 0) {
                int[] path = new int[j - i + 1];
                for (int k = i; k <= j; k ++) path[k - i] = k;
                ans.add(path);
            }
            s -= i;
        }
        return ans.toArray(new int[ans.size()][]);
    }
}
```

### 圆圈中最后剩下的数字

`0,1,···,n-1`这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。求出这个圆圈里剩下的最后一个数字。

例如，`0、1、2、3、4`这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是`2、0、4、1`，因此最后剩下的数字是3。

![圆圈中最后剩下的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/62.jpg)

```java
class Solution {
    public int lastRemaining(int n, int m) {
        if(n == 1) return 0;  
        return (lastRemaining(n - 1, m) + m) % n;
    }
}
```

### 1～n 整数中 1 出现的次数

输入一个整数 n ，求1～n这n个整数的十进制表示中`1`出现的次数。

例如，输入`12，1～12`这些整数中包含1 的数字有`1、10、11和12`，`1`一共出现了5次。

![整数中1出现的次数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/43.jpg)

**思路**：
我们假设 n = abcdef，其中等号右边a为1~9中的某个数字，其余的可为0~9中某个数字，我们需要做的就是统计每个位上，如个位、十位、百位…上能出现1的次数的总和。

假设求c位置为1的个数：
此时c左边和右边的值分别为 lVal = ab, rVal = def, 而t = 1000，表示c的位置是千位的位置
此时则有如下两种情况：

1. lval取[0, ab-1];右边可以从0 取到999，也就是此时c位置可以出现1000次1，我们用t表示，因为t就是1000, 此时res += lval * t;
2. lval 取 ab；

- 如果c=0，没有任何元素,及c位此时一次1都无法出现
- 如果c=1，右边可以取[0，def]也就是def+1个元素,res += def+1
- 如果c>1，右边可以从0取到999，也就是t=1000, 此时res += t;

**举例 :**

假如n = 123456

1. 假设当前计算千位上出现1的个数，在千位上有 _ _x_ _ _，x的左边有 12，右边有 456
   当左边是[0,11]时，千位上可以为1，且千位右边的三位可以是0~999，即千位上的数字我们固定为1，左边是[0-11]的任意一个数字时，右边可以是0~999，共1000个选择，所以千位是1的个数是 12 * 1000
2. 如果左边是12了

- x = 0;千位上没有1
- x = 1,那么前三位固定了是121，但后三位可以是0~456，共457个数，故千位出现1的次数应加上457
- x > 1;此时我们如果把千位x固定为1，后面三位可以是0~999，共1000个数，故千位出现1的次数应加上1000,n = 123456时就是走的该情况。

```java
class Solution {
    public int countDigitOne(int n) {
        if (n == 0) return 0;
        List<Integer> number = new ArrayList<>();
        while (n != 0) {
            number.add(n % 10);
            n /= 10;
        }
        int res = 0;
        for (int i = number.size() - 1; i >= 0; i --) {
            int left = 0, right = 0, t = 1;
            for (int j = number.size() - 1; j > i; j --) {
                left = left * 10 + number.get(j);
            }
            for (int j = i - 1; j >= 0; j --) {
                right = right * 10 + number.get(j);
                t *= 10;
            }
            res += left * t;
            if (number.get(i) == 1) res += right + 1;
            else if (number.get(i) > 1) res += t;
        }
        return res;
    }
}
```

### 数字序列中某一位的数字

数字以`0123456789101112131415…`的格式序列化到一个字符序列中。在这个序列中，第5位（从下标0开始计数）是5，第13位是1，第19位是4，等等。

请写一个函数，求任意第n位对应的数字。

![数字序列中某一位的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer1/44.jpg)

**思路**：
以第1001位数字7为例
1. 步骤1：首先确定该数字是属于几位数的;
如果是一位数，n<9;如果是两位数，n<9+90X2=189;如果是三位数，n<189+900X3=2889;
说明是三位数。
2. 步骤2：确定该数字属于哪个数。100+(1001-190)/3= 370。
3. 步骤3：确定是该数中哪一位。1001-190-(370-100)X3 = 1,所以位于“370”的下标为1的位置，即数字1。

```java
class Solution {
    public int findNthDigit(int n) {
        long i = 1, s = 9, base = 1;
        while (n > i * s) {
            n -= i * s;
            i ++;
            s *= 10;
            base *= 10;
        }
        int number = (int)(base + (n + i - 1) / i - 1);
        int r = (int)(n % i != 0 ? n % i : i);
        for (int j = 0; j < i - r; j ++) {
            number /= 10;
        }
        return number % 10;
    }
}
```





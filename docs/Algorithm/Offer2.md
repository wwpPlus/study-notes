---
title: Offer2
date: 2023-11-19 19:52:50
permalink: /pages/0a5a03/
---
# 剑指Offer Ⅱ
- [原题链接](https://leetcode.cn/studyplan/coding-interviews-special/)

## 整数

### 两数相除

给定两个整数 a 和 b ，求它们的除法的商 a/b ，要求不得使用乘号 '*'、除号 '/' 以及求余符号 '%' 。

**注意：**

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2
假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−231, 231−1]。本题中，如果除法结果溢出，则返回 231 − 1

![两数相除](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/1.jpg)

```java
class Solution {
    public int divide(int dividend, int divisor) {
        // 0x80000000 == -(2^31 - 1)
        if (dividend == 0x80000000 && divisor == -1) {
            return Integer.MAX_VALUE;
        }
        int negative = 2;
        if (dividend > 0) {
            negative --;
            dividend = -dividend;
        }
        if (divisor > 0) {
            negative --;
            divisor = -divisor;
        }
        int res = divideCore(dividend, divisor);
        return negative == 1 ? -res : res;
    }

    public int divideCore(int dividend, int divisor) {
        int res = 0;
        while (dividend <= divisor) {
            int val = divisor;
            int quotient = 1;
            // 0xc0000000 == -(2 ^ 30)
            while (val >= 0xc0000000 && dividend <= val + val) {
                quotient += quotient;
                val += val;
            }
            res += quotient;
            dividend -= val;
        }
        return res;
    }
}
```

### 二进制加法

给定两个 01 字符串 a 和 b ，请计算它们的和，并以二进制字符串的形式输出。

输入为 非空 字符串且只包含数字 1 和 0。

![二进制加法](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/2.jpg)

```java
class Solution {
    public String addBinary(String a, String b) {
        StringBuilder sb = new StringBuilder(""), s1 = new StringBuilder(a).reverse(), s2 = new StringBuilder(b).reverse();
        int cur = 0;
        for (int i = 0, x = 0; i < s1.length() || i < s2.length(); i ++) {
            if (i < s1.length()) {
                x += s1.charAt(i) - '0';
            }
            if (i < s2.length()) {
                x += s2.charAt(i) - '0';
            }
            x += cur;
            cur = x / 2;
            x = x % 2;
            sb.append(x);
            x = x / 2;
        }
        if (cur != 0) {
            sb.append(cur);
        }
        return sb.reverse().toString();
    }
}
```

### 前 n 个数字二进制中 1 的个数

给定一个非负整数 n ，请计算 0 到 n 之间的每个数字的二进制表示中 1 的个数，并输出一个数组。

Brian Kernighan 算法：对于任意整数 xxx，令 x=x & (x−1)x=x~\&~(x-1)x=x & (x−1)，该运算将 xxx 的二进制表示的最后一个 111 变成 000。
因此，对 xxx 重复该操作，直到 xxx 变成 000，则操作次数即为 xxx 的「一比特数」。

![前 n 个数字二进制中 1 的个数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/3.jpg)

```java
class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 0; i <= n; i ++) {
            int cnt = 0, x = i;
            while (x > 0) {
                x &= x - 1;
                cnt ++;
            }
            ans[i] =  cnt;
        }
        return ans;
    }
}
```

动态规划——最低有效位

```java
class Solution {
    public int[] countBits(int n) {
        int[] ans = new int[n + 1];
        for (int i = 0; i <= n; i ++) {
            ans[i] = ans[i >> 1] + (i & 1);
        }
        return ans;
    }
}
```

### 只出现一次的数字

给你一个整数数组 nums ，除某个元素仅出现 一次 外，其余每个元素都恰出现 三次 。请你找出并返回那个只出现了一次的元素。

![只出现一次的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/4.jpg)

哈希法

```java
class Solution {
    public int singleNumber(int[] nums) {
        Map<Integer, Integer> hash = new HashMap<>();
        for (int n : nums) {
            hash.put(n, hash.getOrDefault(n, 0) + 1);
        }
        for (Map.Entry<Integer, Integer> entry : hash.entrySet()) {
            int k = entry.getKey(), v = entry.getValue();
            if (v == 1) {
                return k;
            }
        }
        return 0;
    }
}
```

依次确定每一个二进制位

```java
class Solution {
    public int singleNumber(int[] nums) {
        int ans = 0;
        for (int i = 0; i < 32; i ++) {
            int cnt = 0;
            for (int num : nums) {
                cnt += num >> i & 1;
            }
            if (cnt % 3 != 0) {
                ans |= 1 << i;
            }
        }
        return ans;
    }
}
```

### 单词长度的最大乘积

给定一个字符串数组 words，请计算当两个字符串 words[i] 和 words[j] 不包含相同字符时，它们长度的乘积的最大值。假设字符串中只包含英语的小写字母。如果没有不包含相同字符的一对字符串，返回 0。

![单词长度的最大乘积](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/5.jpg)

```java
class Solution {
    public int maxProduct(String[] words) {
        int[] masks = new int[words.length];
        for (int i = 0; i < words.length; i ++) {
            for (int j = 0; j < words[i].length(); j ++) {
                masks[i] |= 1 << (words[i].charAt(j) - 'a');
            }
        }
        int ans = 0;
        for (int i = 0; i < words.length; i ++) {
            for (int j = i + 1; j < words.length; j ++) {
                if ((masks[i] & masks[j]) == 0) {
                    ans = Math.max(ans, words[i].length() * words[j].length());
                }
            }
        }
        return ans;
    }
}
```

## 数组

### 排序数组中两个数字之和

给定一个已按照 升序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。

![排序数组中两个数字之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/6.jpg)

```java
class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int i = 0, j = numbers.length - 1;
        while (i < j && numbers[i] + numbers[j] != target) {
            int x = numbers[i] + numbers[j];
            if (x > target) {
                j --;
            } else if (x < target) {
                i ++;
            }
        }
        return new int[]{i, j};
    }
}
```

### 数组中和为 0 的三个数

给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

注意：答案中不可以包含重复的三元组。

![数组中和为 0 的三个数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/7.jpg)

```java
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        List<List<Integer>> res = new ArrayList<List<Integer>>();
        if (n >= 3) {
            Arrays.sort(nums);
            int i = 0;
            while (i < n - 2) {
                towSum(nums, i, res);
                int t = nums[i];
                while (i < n && nums[i] == t) {
                    i ++;
                }
            }
        }
        return res;
    }
    public void towSum(int[] nums, int i, List<List<Integer>> res) {
        int j = i + 1, k = nums.length - 1;
        while (j < k) {
            int x = nums[i] + nums[j] + nums[k];
            if (x == 0) {
                res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                int t = nums[j];
                while (t == nums[j] && j < k) {
                    j ++;
                }
            } else if (x < 0) {
                j ++;
            } else {
                k --;
            }
        }
    }
}
```

### 和大于等于 target 的最短子数组

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

![和大于等于 target 的最短子数组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/8.jpg)

```java
class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int ans = Integer.MAX_VALUE, sum = 0;
        for (int i = 0, j = 0; i < nums.length; i ++) {
            sum += nums[i];
            while (sum >= target && j <= i) {
                ans = Math.min(ans, i - j + 1);
                sum -= nums[j ++];
            }
        }
        return ans == Integer.MAX_VALUE ? 0 : ans;
    }
}
```

### 乘积小于 K 的子数组 

给定一个正整数数组 nums和整数 k ，请找出该数组内乘积小于 k 的连续的子数组的个数。

![乘积小于 K 的子数组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/9.jpg)

```java
class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        int ans = 0, mul = 1;
        for (int i = 0, j = 0; i < nums.length; i ++) {
            mul *= nums[i];
            while (mul >= k && j < i) {
                mul /= nums[j ++];
            }
            if (mul < k) {
                ans += i - j + 1;
            }
        }
        return ans;
    }
}
```

### 和为 k 的子数组

给定一个整数数组和一个整数 k ，请找到该数组中和为 k 的连续子数组的个数。

![和为 k 的子数组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/10.jpg)

```java
class Solution {
    public int subarraySum(int[] nums, int k) {
        int sum = 0, res = 0;
        Map<Integer, Integer> hash = new HashMap<>();
        hash.put(0, 1);
        for (int item : nums) {
            sum += item;
            res += hash.getOrDefault(sum - k, 0);
            hash.put(sum, hash.getOrDefault(sum, 0) + 1); 
        }
        return res;
    }
}
```

### 0 和 1 个数相同的子数组

给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。

![0 和 1 个数相同的子数组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/11.jpg)

```java
class Solution {
    public int findMaxLength(int[] nums) {
        int ans = 0, sum = 0;
        Map<Integer, Integer> hash = new HashMap<>();
        hash.put(0, -1);
        for (int i = 0; i < nums.length; i ++) {
            sum += nums[i] == 0 ? -1 : 1;
            if (hash.containsKey(sum)) {
                ans = Math.max(ans, i - hash.get(sum));
            } else {
                hash.put(sum, i);
            }
        }
        return ans;
    }
}
```

### 左右两边子数组的和相等

给你一个整数数组 nums ，请计算数组的 中心下标 。

数组 中心下标 是数组的一个下标，其左侧所有元素相加的和等于右侧所有元素相加的和。

如果中心下标位于数组最左端，那么左侧数之和视为 0 ，因为在下标的左侧不存在元素。这一点对于中心下标位于数组最右端同样适用。

如果数组有多个中心下标，应该返回 最靠近左边 的那一个。如果数组不存在中心下标，返回 -1 。

![左右两边子数组的和相等](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/12.jpg)

```java
class Solution {
    public int pivotIndex(int[] nums) {
        int total = Arrays.stream(nums).sum(), sum = 0;
        for (int i = 0; i < nums.length; i ++) {
            if (2 * sum + nums[i] == total) {
                return i;
            }
            sum += nums[i];
        }
        return -1;
    }
}
```

### 二维子矩阵的和

给定一个二维矩阵 matrix，以下类型的多个请求：

- 计算其子矩形范围内元素的总和，该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。
实现 NumMatrix 类：
- NumMatrix(int[][] matrix) 给定整数矩阵 matrix 进行初始化
- int sumRegion(int row1, int col1, int row2, int col2) 返回左上角 (row1, col1) 、右下角 (row2, col2) 的子矩阵的元素总和。

![二维子矩阵的和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/13.jpg)

```java
class NumMatrix {

    int[][] s;
    public NumMatrix(int[][] matrix) {
        int n = matrix.length, m = matrix[0].length;
        s = new int[n + 1][m + 1];
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j < m; j ++) {
                s[i + 1][j + 1] = s[i + 1][j] + s[i][j + 1] - s[i][j] + matrix[i][j];
            }
        }
    }
    
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return s[row2 + 1][col2 + 1] - s[row2 + 1][col1] - s[row1][col2 + 1] + s[row1][col1];
    }
}
```

## 字符串

### 字符串中的变位词

给定两个字符串 s1 和 s2，写一个函数来判断 s2 是否包含 s1 的某个变位词。

换句话说，第一个字符串的排列之一是第二个字符串的 子串 。

![字符串中的变位词](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/14.jpg)

```java
class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) {
            return false;
        }
        int[] hash = new int[26];
        for (int i = 0; i < s1.length(); i ++) {
            hash[s1.charAt(i) - 'a'] ++;
            hash[s2.charAt(i) - 'a'] --;
        }
        if (isAllZero(hash)) {
            return true;
        }
        for (int i = s1.length(); i < s2.length(); i ++) {
            hash[s2.charAt(i) - 'a'] --;
            hash[s2.charAt(i - s1.length()) - 'a'] ++;
            if (isAllZero(hash)) {
                return true;
            }
        }
        return false;
    }

    boolean isAllZero(int[] h) {
        for (int num : h) {
            if (num != 0) {
                return false;
            }
        }
        return true;
    }
}
```

### 字符串中的所有变位词

给定两个字符串 s 和 p，找到 s 中所有 p 的 变位词 的子串，返回这些子串的起始索引。不考虑答案输出的顺序。

变位词 指字母相同，但排列不同的字符串。

![字符串中的所有变位词](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/15.jpg)

```java
class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> ans = new ArrayList<>();
        if (s.length() < p.length()) {
            return ans;
        }
        int[] h = new int[26];
        for (int i = 0; i < p.length(); i ++) {
            h[p.charAt(i) - 'a'] ++;
            h[s.charAt(i) - 'a'] --;
        }
        if (isAllZero(h)) {
            ans.add(0);
        }
        for (int i = p.length(); i < s.length(); i ++) {
            h[s.charAt(i) - 'a'] --;
            h[s.charAt(i - p.length()) - 'a'] ++;
            if (isAllZero(h)) {
                ans.add(i - p.length() + 1);
            }
        }
        return ans;
    }
    boolean isAllZero(int[] h) {
        for (int num : h) {
            if (num != 0) {
                return false;
            }
        }
        return true;
    }
}
```

### 不含重复字符的最长子字符串

给定一个字符串 s ，请你找出其中不含有重复字符的 最长连续子字符串 的长度。

![不含重复字符的最长子字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/16.jpg)

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        int ans = 0;
        int[] h = new int[1010];
        for (int i = 0, j = 0; i < s.length(); i ++) {
            h[s.charAt(i)] ++;
            while (j <= i && h[s.charAt(i)] > 1){
                h[s.charAt(j)] --;
                j ++;
            }
            ans = Math.max(ans, i - j + 1);
        }
        return ans;
    }
}
```

### 含有所有字符的最短字符串

给定两个字符串 s 和 t 。返回 s 中包含 t 的所有字符的最短子字符串。如果 s 中不存在符合条件的子字符串，则返回空字符串 "" 。

如果 s 中存在多个符合条件的子字符串，返回任意一个。

> 注意： 对于 t 中重复字符，我们寻找的子字符串中该字符数量必须不少于 t 中该字符数量。

![含有所有字符的最短字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/17.jpg)

```java
class Solution {
    public String minWindow(String s, String t) {
        if (s.length() < t.length()) {
            return "";
        }
        int[] h1 = new int[256], h2 = new int[256];
        for (char c : t.toCharArray()) {
            h1[c] ++;
        }
        int l = -1, r = s.length();
        for (int i = 0, j = 0; i < s.length(); i ++) {
            h2[s.charAt(i)] ++;
            while (j <= i && coverT(h1, h2)) {
                if (r - l > i - j + 1) {
                    l = j;
                    r = i + 1;
                }
                h2[s.charAt(j ++)] --;
            }
        }
        return l == -1 ? "" : s.substring(l, r);
    }
    private boolean coverT(int[] h1, int[] h2) {
        for (int i = 0; i < h1.length; i ++) {
            if (h1[i] > 0 && h1[i] > h2[i]) {
                return false;
            }
        }
        return true;
    }
}
```

### 有效的回文

给定一个字符串 s ，验证 s 是否是 回文串 ，只考虑字母和数字字符，可以忽略字母的大小写。

本题中，将空字符串定义为有效的 回文串 。

![有效的回文](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/18.jpg)

```java
class Solution {
    public boolean isPalindrome(String s) {
        s = s.toLowerCase();
        for (int i = 0, j = s.length() - 1; i < j; ) {
            char c1 = s.charAt(i), c2 = s.charAt(j);
            if (!Character.isLetterOrDigit(c1)) {
                i ++;
            } else if (!Character.isLetterOrDigit(c2)) {
                j --;
            } else {
                if (c1 != c2) {
                    return false;
                }   
                i ++; j --;
            }
        }
        return true;
    }
}
```

### 最多删除一个字符得到回文

给定一个非空字符串 s，请判断如果 最多 从字符串中删除一个字符能否得到一个回文字符串。

![最多删除一个字符得到回文](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/19.jpg)

```java
class Solution {
    public boolean validPalindrome(String s) {
        int i = 0, j = s.length() - 1;
        while (i < j) {
            if (s.charAt(i) != s.charAt(j)) {
                break;
            }
            i ++; j --;
        }
        return i == j || isPalindrome(s, i + 1, j) || isPalindrome(s, i, j - 1);
    }
    public boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l) != s.charAt(r)) {
                return false;
            }
            l ++; r --;
        }
        return true;
    }
}
```

### 回文子字符串的个数

给定一个字符串 s ，请计算这个字符串中有多少个回文子字符串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

![回文子字符串的个数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/20.jpg)

```java
class Solution {
    public int countSubstrings(String s) {
        int cnt = 0;
        for (int i = 0; i < s.length(); i ++) {
            cnt += countPalindrome(s, i, i);
            cnt += countPalindrome(s, i, i + 1);
        }
        return cnt;
    }
    int countPalindrome(String s, int i, int j) {
        int cnt = 0;
        while (i >= 0 && j < s.length() && s.charAt(i) == s.charAt(j)) {
            i --; j ++;
            cnt ++;
        }
        return cnt;
    }
}
```

## 链表

### 删除链表的倒数第 n 个结点

给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

![删除链表的倒数第 n 个结点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/21.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(-1), p, q;
        dummy.next = head;
        p = head; q = head;
        for (int i = 0; i < n; i ++) {
            p = p.next; q = q.next;
        }
        p = dummy;
        while (q != null) {
            p = p.next; q = q.next;
        }
        p.next = p.next.next;
        return dummy.next;
    }
}
```

### 链表中环的入口节点

给定一个链表，返回链表开始入环的第一个节点。 从链表的头节点开始沿着 next 指针进入环的第一个节点为环的入口节点。如果链表无环，则返回 null。

![链表中环的入口节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/22.jpg)

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }
        ListNode slow = head.next, fast = slow.next;
        while (fast != null && fast != slow) {
            slow = slow.next;
            fast = fast.next;
            if (fast != null) {
                fast = fast.next;
            }
        }
        if (fast == slow) {
            slow = head;
            while (fast != slow) {
                fast = fast.next;
                slow = slow.next;
            }
            return slow;
        }
        return null;
    }
}
```

### 两个链表的第一个重合节点

给定两个单链表的头节点 headA 和 headB ，请找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

![两个链表的第一个重合节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/23.jpg)

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
public class Solution {
    ListNode IntersectionNode(ListNode headA, ListNode headB, ListNode p, ListNode q) {
        ListNode t = q;
        q = headB;
        while (t != null) {
            t = t.next; q = q.next;
        }
        p = headA;
        while (p != null && q != null && p != q) {
            q = q.next; p = p.next;
        }
        return p;
    }
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode p = headA, q = headB, res;
        while (p != null && q != null) {
            p = p.next; q = q.next;
        }
        if (p == null) {
            res = IntersectionNode(headA, headB, p, q);
        } else {
            res = IntersectionNode(headB, headA, q, p);
        }
        return res;
    }
}
```

### 反转链表

给定单链表的头节点 head ，请反转链表，并返回反转后的链表的头节点。

![反转链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/24.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode q = new ListNode(-1), p = head;
        while (p != null) {
            var next = p.next;
            p.next = q.next;
            q.next = p;
            p = next;
        }
        return q.next;
    }
}
```

### 链表中的两数相加

给定两个 非空链表 l1和 l2 来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储一位数字。将这两数相加会返回一个新的链表。

可以假设除了数字 0 之外，这两个数字都不会以零开头。

![链表中的两数相加](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/25.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode p = reverse(l1), q = reverse(l2), dummy = new ListNode(-1), t = dummy;
        int cur = 0;
        while (p != null || q != null) {
            int x = cur;
            if (p != null) {
                x += p.val; p = p.next;
            }
            if (q != null) {
                x += q.val; q = q.next;
            }
            cur = x / 10;
            t.next = new ListNode(x % 10);
            t = t.next;
        }
        if (cur != 0) {
            t.next = new ListNode(cur);
            t = t.next;
        }
        t.next = null;
        return reverse(dummy.next);
    }
    ListNode reverse(ListNode p) {
        ListNode q = new ListNode(-1);
        while (p != null) {
            var next = p.next;
            p.next = q.next;
            q.next = p;
            p = next;
        }
        return q.next;
    }
}
```

### 重排链表

给定一个单链表 L 的头节点 head ，单链表 L 表示为：
` L0 → L1 → … → Ln-1 → Ln `

请将其重新排列后变为：
`L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …`

不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

![重排链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/26.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    ListNode findHalf(ListNode head) {
        int cnt = 0;
        var p = head;
        while (p != null) {
            cnt ++; p = p.next;
        }
        cnt = (cnt + 1) >> 1; p = head;
        while (cnt -- > 0) {
            var next = p.next;
            if (cnt < 1) {
                p.next = null;
            }
            p = next;
        }
        return reverse(p);
    }
    ListNode reverse(ListNode p) {
        ListNode q = new ListNode(-1);
        while (p != null) {
            var next = p.next;
            p.next = q.next;
            q.next = p;
            p = next;
        }
        return q.next;
    }
    public void reorderList(ListNode head) {
        ListNode p = head, q = findHalf(head), dummy = new ListNode(-1), t = dummy;

        while (p != null || q != null) {
            if (p != null) {
                t.next = p; t = t.next; p = p.next;
            }
            if (q != null){
                t.next = q; t = t.next; q = q.next;
            }
        }
        t.next = null;
    }
}
```

### 回文链表

给定一个链表的 头节点 head ，请判断其是否为回文链表。

如果一个链表是回文，那么链表节点序列从前往后看和从后往前看是相同的。

![回文链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/27.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    ListNode findHalf(ListNode head) {
        int cnt = 0;
        var p = head;
        while (p != null) {
            cnt ++; p = p.next;
        }
        cnt = (cnt + 1) / 2; p = head;
        while (cnt -- > 0) {
            var next = p.next;
            if (cnt < 1) {
                p.next = null;
            }
            p = next;
        }
        return reverse(p);
    }
    ListNode reverse(ListNode head) {
        ListNode q = new ListNode(-1), p = head;
        while (p != null) {
            var next = p.next;
            p.next = q.next;
            q.next = p;
            p = next;
        }
        return q.next;
    }
    public boolean isPalindrome(ListNode head) {
        ListNode p = head, q = findHalf(head);
        while (q != null) {
            if (q.val == p.val) {
                q = q.next; p = p.next;
            } else {
                return false;
            }
        }
        return true;
    }
}
```

### 展平多级双向链表

多级双向链表中，除了指向下一个节点和前一个节点指针之外，它还有一个子链表指针，可能指向单独的双向链表。这些子列表也可能会有一个或多个自己的子项，依此类推，生成多级数据结构，如下面的示例所示。

给定位于列表第一级的头节点，请扁平化列表，即将这样的多级双向链表展平成普通的双向链表，使所有结点出现在单级双链表中。

![展平多级双向链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/28.jpg)

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node prev;
    public Node next;
    public Node child;
};
*/
class Solution {
    
    public Node flatten(Node head) {
        flattenOneLayer(head);
        return head;
    }
    Node flattenOneLayer(Node head) {
        Node p = head, tail = null;
        while (p != null) {
            var next = p.next;
            if (p.child != null) {
                tail = flattenOneLayer(p.child);
                p.next = p.child;
                p.child.prev = p;
                p.child = null;
                tail.next = next;
                if (next != null) {
                    next.prev = tail;
                }
            } else {
                tail = p;
            }
            p = next;
        }
        return tail;
    }
}
```

### 排序的循环链表

给定循环单调非递减列表中的一个点，写一个函数向这个列表中插入一个新元素 insertVal ，使这个列表仍然是循环升序的。

给定的可以是这个列表中任意一个顶点的指针，并不一定是这个列表中最小元素的指针。

如果有多个满足条件的插入位置，可以选择任意一个位置插入新的值，插入后整个列表仍然保持有序。

如果列表为空（给定的节点是 null），需要创建一个循环有序列表并返回这个节点。否则。请返回原先给定的节点。

![排序的循环链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/29.jpg)

```java
/*
// Definition for a Node.
class Node {
    public int val;
    public Node next;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _next) {
        val = _val;
        next = _next;
    }
};
*/

class Solution {
    public Node insert(Node head, int insertVal) {
        Node node = new Node(insertVal);
        if (head == null) {
            head = node;
            head.next = head;
        } else if (head.next == head) {
            node.next = head.next;
            head.next = node;
        } else {
            insertCore(head, node);
        }
        return head;
    }
    public void insertCore(Node head, Node node) {
        Node cur = head, next = head.next, maxValNode = head;
        while (!(cur.val <= node.val && node.val <= next.val) && next != head) {
            cur = next;
            next = next.next;
            if (cur.val >= maxValNode.val) {
                maxValNode = cur;
            }
        }
        if (cur.val <= node.val && node.val <= next.val) {
            cur.next = node;
            node.next = next;
        } else {
            node.next = maxValNode.next;
            maxValNode.next = node;
        }
    }
}
```

## 哈希表

### 插入、删除和随机访问都是 O(1) 的容器

设计一个支持在平均 时间复杂度 O(1) 下，执行以下操作的数据结构：

- insert(val)：当元素 val 不存在时返回 true ，并向集合中插入该项，否则返回 false 。
- remove(val)：当元素 val 存在时返回 true ，并从集合中移除该项，否则返回 false 。
- getRandom：随机返回现有集合中的一项。每个元素应该有 相同的概率 被返回。

![插入、删除和随机访问都是 O(1) 的容器](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/30.jpg)

```java
class RandomizedSet {

    Map<Integer, Integer> hash;
    List<Integer> list;

    /** Initialize your data structure here. */
    public RandomizedSet() {
        hash = new HashMap<>();
        list = new ArrayList<>();
    }
    
    /** Inserts a value to the set. Returns true if the set did not already contain the specified element. */
    public boolean insert(int val) {
        if (hash.containsKey(val)) {
            return false;
        }
        hash.put(val, list.size());
        list.add(val);
        return true;
    }
    
    /** Removes a value from the set. Returns true if the set contained the specified element. */
    public boolean remove(int val) {
        if (!hash.containsKey(val)) {
            return false;
        }
        int location = hash.get(val);
        hash.put(list.get(list.size() - 1), location);
        list.set(location, list.get(list.size() - 1));
        hash.put(val, hash.size());
        hash.remove(val);
        list.remove(list.size() - 1);
        return true;
    }
    
    /** Get a random element from the set. */
    public int getRandom() {
        Random random = new Random();
        int idx = random.nextInt(list.size());
        return list.get(idx);
    }
}
```

### 最近最少使用缓存

运用所掌握的数据结构，设计和实现一个  LRU (Least Recently Used，最近最少使用) 缓存机制 。

实现 LRUCache 类：

- LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
- void put(int key, int value) 如果关键字已经存在，则变更其数据值；如果关键字不存在，则插入该组「关键字-值」。当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。

![最近最少使用缓存](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/31.jpg)

```java
class LRUCache {

    int capacity;
    Map<Integer, ListNode> hash;
    ListNode head, tail;

    class ListNode {
        int key, value;
        ListNode prev, next;
        public ListNode(int k, int v) {
            key = k;
            value = v;
        }
    }

    public LRUCache(int cap) {
        hash = new HashMap<>();
        head = new ListNode(-1, -1);
        tail = new ListNode(-1, -1);
        head.next = tail;
        tail.prev = head;
        capacity = cap;
    }
    
    public int get(int key) {
        var node = hash.get(key);
        if (node == null) {
            return -1;
        }
        deleteNode(node);
        moveToTail(node);
        return node.value;
    }
    
    public void put(int key, int value) {
        var node = hash.get(key);
        if (node != null) {
            node.value = value;
            deleteNode(node);
        } else {
            if (hash.size() == capacity) {
                hash.remove(head.next.key);
                deleteNode(head.next);
            }
            node = new ListNode(key, value);
            hash.put(key, node);    
        }
        moveToTail(node);
    }
    void deleteNode(ListNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    void moveToTail(ListNode node) {
        tail.prev.next = node;
        node.prev = tail.prev;
        node.next = tail;
        tail.prev = node;
    }
}
```

### 有效的变位词

给定两个字符串 s 和 t ，编写一个函数来判断它们是不是一组变位词（字母异位词）。

注意：若 s 和 t 中每个字符出现的次数都相同且字符顺序不完全相同，则称 s 和 t 互为变位词（字母异位词）。

![有效的变位词](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/32.jpg)

```java
class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length() || s.equals(t)) {
            return false;
        }
        int[] h = new int[26];
        for (int i = 0; i < s.length(); i ++) {
            h[s.charAt(i) - 'a'] ++;
            h[t.charAt(i) - 'a'] --;
        }
        for (int i = 0; i < 26; i ++) {
            if (h[i] != 0) {
                return false;
            }
        }
        return true;
    }
}
```

### 变位词组

给定一个字符串数组 strs ，将 变位词 组合在一起。 可以按任意顺序返回结果列表。

注意：若两个字符串中每个字符出现的次数都相同，则称它们互为变位词。

![变位词组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/33.jpg)

```java
class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> hash = new HashMap<>();
        for (String s : strs) {
            char[] cs = s.toCharArray();
            Arrays.sort(cs);
            String ts = new String(cs);
            hash.putIfAbsent(ts, new ArrayList());
            hash.get(ts).add(s);

        }
        return new ArrayList(hash.values());
    }
}
```

### 外星语言是否排序

某种外星语也使用英文小写字母，但可能顺序 order 不同。字母表的顺序（order）是一些小写字母的排列。

给定一组用外星语书写的单词 words，以及其字母表的顺序 order，只有当给定的单词在这种外星语中按字典序排列时，返回 true；否则，返回 false。

![外星语言是否排序](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/34.jpg)

```java
class Solution {
    public boolean isAlienSorted(String[] words, String order) {
        int[] h = new int[26];
        for (int i = 0; i < order.length(); i ++) {
            h[order.charAt(i) - 'a'] = i;
        }
        for (int i = 1; i < words.length; i ++) {
            if (!compare(words[i - 1], words[i], h)) {
                return false;
            }
        }
        return true;
    }
    boolean compare(String s1, String s2, int[] h) {
        for (int i = 0; i < s1.length() && i < s2.length(); i ++) {
            char c1 = s1.charAt(i), c2 = s2.charAt(i);
            if (h[c1 - 'a'] < h[c2 - 'a']) {
                return true;
            } else if (h[c1 - 'a'] > h[c2 - 'a']) {
                return false;
            }
        }
        return s1.length() <= s2.length();
    }
}
```

### 最小时间差

给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。

![最小时间差](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/35.jpg)

```java
class Solution {
    public int findMinDifference(List<String> timePoints) {
        int n = timePoints.size();
        if (n > 1440) {
            return 0;
        }
        Collections.sort(timePoints);
        int ans = Integer.MAX_VALUE, t0M = getMinutes(timePoints.get(0)), preM = t0M;
        for (int i = 1; i < n; i ++) {
           int curM = getMinutes(timePoints.get(i));
           ans = Math.min(ans, curM - preM);
           preM = curM; 
        }
        ans = Math.min(ans, t0M + 1440 - preM);
        return ans;
    }
    public int getMinutes(String t) {
        return ((t.charAt(0) - '0') * 10 + (t.charAt(1) - '0')) * 60 + (t.charAt(3) - '0') * 10 + (t.charAt(4) - '0');
    }
}
```

## 栈

### 后缀表达式

根据 逆波兰表示法，求该后缀表达式的计算结果。

有效的算符包括 +、-、*、/ 。每个运算对象可以是整数，也可以是另一个逆波兰表达式。

![后缀表达式](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/36.jpg)

```java
class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> st = new Stack<>();
        for (String s : tokens) {
            char c = s.charAt(0);
            if ((c == '+' || c == '-' || c == '*' || c == '/') && s.length() == 1) {
                int a = st.pop(), b = st.pop();
                int t = caculate(b, a, c);
                st.push(t);
            } else {
                st.push(Integer.parseInt(s));
            }
        }
        return st.pop();
    }
    int caculate(int a, int b, char op) {
        if (op == '+') {
            return a + b;
        } else if (op == '-') {
            return a - b;
        } else if (op == '*') {
            return a * b;
        } else {
            return a / b;
        }
    }
}
```

### 小行星碰撞

给定一个整数数组 asteroids，表示在同一行的小行星。

对于数组中的每一个元素，其绝对值表示小行星的大小，正负表示小行星的移动方向（正表示向右移动，负表示向左移动）。每一颗小行星以相同的速度移动。

找出碰撞后剩下的所有小行星。碰撞规则：两个行星相互碰撞，较小的行星会爆炸。如果两颗行星大小相同，则两颗行星都会爆炸。两颗移动方向相同的行星，永远不会发生碰撞。

![小行星碰撞](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/37.jpg)

```java
class Solution {
    public int[] asteroidCollision(int[] asteroids) {
        Stack<Integer> st = new Stack<>();
        List<Integer> ans = new ArrayList<>();
        for (int num : asteroids) {
            while (!st.isEmpty() && st.peek() > 0 && st.peek() < -num) {
                st.pop();
            }
            if (!st.isEmpty() && num < 0 && st.peek() == -num) {
                st.pop();
            } else if (num > 0 || st.isEmpty() || st.peek() < 0) {
                st.push(num);
            }
        }
        return st.stream().mapToInt(i->i).toArray();
    }
}
```

### 每日温度

请根据每日 气温 列表 temperatures ，重新生成一个列表，要求其对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。

![每日温度](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/38.jpg)

```java
class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        Stack<Integer> st = new Stack<>();
        int n = temperatures.length;
        int[] ans = new int[n];
        st.push(0);
        for (int i = 1; i < n; i ++) {
            while (!st.isEmpty() && temperatures[st.peek()] < temperatures[i]) {
                int k = st.pop();
                ans[k] = i - k;
            }
            st.push(i);
        }
        return ans;
    }
}
```

### 直方图最大矩形面积

给定非负整数数组 heights ，数组中的数字用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。

求在该柱状图中，能够勾勒出来的矩形的最大面积。

![直方图最大矩形面积](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/39.jpg)

```java
class Solution {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> st = new Stack<>();
        st.push(-1);
        int ans = 0;
        for (int i = 0; i < heights.length; i ++) {
            while (st.peek() != -1 && heights[st.peek()] >= heights[i]) {
                int height = heights[st.pop()];
                int width = i - st.peek() - 1;
                ans = Math.max(ans, height * width);
            }
            st.push(i);
        }
        while (st.peek() != -1) {
            int height = heights[st.pop()];
            int width = heights.length - st.peek() - 1;
            ans = Math.max(ans, height * width);
        }
        return ans;
    }
}
```

### 矩阵中最大的矩形

给定一个由 0 和 1 组成的矩阵 matrix ，找出只包含 1 的最大矩形，并返回其面积。

注意：此题 matrix 输入格式为一维 01 字符串数组。

![矩阵中最大的矩形](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/40.jpg)

```java
class Solution {
    public int maximalRectangle(String[] matrix) {
        int n = matrix.length, m = matrix[0].length(), ans = 0;
        if (n == 0 || m == 0) {
            return ans;
        }
        int[] heights = new int[m];
        for (String s : matrix) {
            char[] cs = s.toCharArray();
            for (int i = 0; i < cs.length; i ++) {
                if (cs[i] == '1') {
                    heights[i] ++;
                } else {
                    heights[i] = 0;
                }
            }
            ans = Math.max(ans, largestRectangleArea(heights));
        }
        return ans;
    }
    int largestRectangleArea(int[] heights) {
        Stack<Integer> st = new Stack<>();
        st.push(-1);
        int res = 0;
        for (int i = 0; i < heights.length; i ++) {
            while (st.peek() != -1 && heights[st.peek()] >= heights[i]) {
                int height = heights[st.pop()];
                int width = i - st.peek() - 1;
                res = Math.max(res, height * width);
            }
            st.push(i);
        }
        while (st.peek() != -1) {
            int height = heights[st.pop()];
            int width = heights.length - st.peek() - 1;
            res = Math.max(res, height * width); 
        }
        return res;
    }
}
```

## 队列

### 滑动窗口的平均值

给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算滑动窗口里所有数字的平均值。

实现 `MovingAverage` 类：

`MovingAverage(int size)` 用窗口大小 size 初始化对象。
`double next(int val)` 成员函数 next 每次调用的时候都会往滑动窗口增加一个整数，请计算并返回数据流中最后 size 个值的移动平均值，即滑动窗口里所有数字的平均值。

![滑动窗口的平均值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/41.jpg)

```java
class MovingAverage {

    Queue<Integer> queue;
    int capacity = 0;
    int sum = 0;
    /** Initialize your data structure here. */
    public MovingAverage(int size) {
        queue = new LinkedList<>();
        capacity = size;
    }
    
    public double next(int val) {
        queue.offer(val);
        sum += val;
        if (queue.size() > capacity) {
            sum -= queue.poll();
        }
        return sum / (queue.size() * 1.0);
    }
}
```

### 最近请求次数

写一个 `RecentCounter` 类来计算特定时间范围内最近的请求。

请实现 `RecentCounter` 类：

`RecentCounter()` 初始化计数器，请求数为 0 。
`int ping(int t)` 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。

**保证** 每次对 ping 的调用都使用比之前更大的 t 值。

![最近请求次数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/42.jpg)

```java
class RecentCounter {

    Queue<Integer> queue;
    public RecentCounter() {
        queue = new LinkedList<>();
    }
    
    public int ping(int t) {
        while (!queue.isEmpty() && queue.peek() < t - 3000) {
            queue.poll();
        }
        queue.offer(t);
        return queue.size();
    }
}
```

### 往完全二叉树添加节点

完全二叉树是每一层（除最后一层外）都是完全填充（即，节点数达到最大，第 n 层有 2n-1 个节点）的，并且所有的节点都尽可能地集中在左侧。

设计一个用完全二叉树初始化的数据结构 CBTInserter，它支持以下几种操作：

`CBTInserter(TreeNode root)` 使用根节点为 root 的给定树初始化该数据结构；
`CBTInserter.insert(int v)`  向树中插入一个新节点，节点类型为 TreeNode，值为 v 。使树保持完全二叉树的状态，并返回插入的新节点的父节点的值；
`CBTInserter.get_root()` 将返回树的根节点。

![往完全二叉树添加节点](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/43.jpg)

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
class CBTInserter {

    Queue<TreeNode> queue;
    TreeNode root;
    public CBTInserter(TreeNode root) {
        queue = new LinkedList<>();
        queue.offer(root);
        TreeNode p = root;
        this.root = root;
        while (queue.peek().left != null && queue.peek().right != null) {
            p = queue.poll();
            queue.offer(p.left);
            queue.offer(p.right);
        }
    }
    
    public int insert(int v) {
        TreeNode node = new TreeNode(v), parent = queue.peek();
        if (parent.left == null) {
            parent.left = node;
        } else {
            parent.right = node;
            queue.poll();
            queue.offer(parent.left);
            queue.offer(parent.right);
        }
        return parent.val;
    }
    
    public TreeNode get_root() {
        return this.root;
    }
}
```

### 二叉树每层的最大值

给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。

![二叉树每层的最大值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/44.jpg)

计数法：记录当前层和下一层的节点数量

```java
class Solution {
    public List<Integer> largestValues(TreeNode root) {
        Queue<TreeNode> queue = new LinkedList<>();
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        int res = Integer.MIN_VALUE, current = 1 , next = 0;
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode p = queue.poll();
            current --;
            res = Math.max(res, p.val);
            if (p.left != null) {
                queue.offer(p.left);
                next ++;
            }
            if (p.right != null) {
                queue.offer(p.right);
                next ++;
            }
            if (current == 0) {
                ans.add(res);
                current = next;
                next = 0;
                res = Integer.MIN_VALUE;
            }
        }
        return ans;
    }
}
```

两队列法：使用两个队列分别记录当前层和下一层节点

```java
class Solution {
    public List<Integer> largestValues(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        Queue<TreeNode> queue1 = new LinkedList<>();
        Queue<TreeNode> queue2 = new LinkedList<>();
        queue1.offer(root);
        int res = Integer.MIN_VALUE;
        while (!queue1.isEmpty()) {
            TreeNode p = queue1.poll();
            res = Math.max(res, p.val);
            if (p.left != null) {
                queue2.offer(p.left);
            }
            if (p.right != null) {
                queue2.offer(p.right);
            }
            if (queue1.isEmpty()) {
                queue1 = queue2;
                queue2 = new LinkedList<>();
                ans.add(res);
                res = Integer.MIN_VALUE;
            }
        }
        return ans;
    }
}
```

### 二叉树最底层最左边的值

给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。

假设二叉树中至少有一个节点。

![二叉树最底层最左边的值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/45.jpg)

```java
class Solution {
    public int findBottomLeftValue(TreeNode root) {
        Queue<TreeNode> queue1 = new LinkedList<>();
        Queue<TreeNode> queue2 = new LinkedList<>();

        int res = root.val;
        queue1.offer(root);
        while (!queue1.isEmpty()) {
            TreeNode p = queue1.poll();
            if (p.left != null) {
                queue2.offer(p.left);
            }
            if (p.right != null) {
                queue2.offer(p.right);
            }
            if (queue1.isEmpty()) {
                queue1 = queue2;
                queue2 = new LinkedList<>();
                if (!queue1.isEmpty()) {
                    res = queue1.peek().val;
                }
            }
        }
        return res;
    }
}
```

### 二叉树的右侧视图

给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

![二叉树的右侧视图](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/46.jpg)

```java
class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        Queue<TreeNode> queue1 = new LinkedList<>();
        Queue<TreeNode> queue2 = new LinkedList<>();
        
        queue1.offer(root);
        while (!queue1.isEmpty()) {
            TreeNode p  = queue1.poll();
            if (p.left != null) {
                queue2.offer(p.left);
            }
            if (p.right != null) {
                queue2.offer(p.right);
            }
            if (queue1.isEmpty()) {
                queue1 = queue2;
                queue2 = new LinkedList<>();
                ans.add(p.val);
            }
        }
        return ans;
    }
}
```

## 树

### 二叉树剪枝

给定一个二叉树 根节点 root ，树的每个节点的值要么是 0，要么是 1。请剪除该二叉树中所有节点的值为 0 的子树。

节点 node 的子树为 node 本身，以及所有 node 的后代。

![二叉树剪枝](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/47.jpg)

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
    public TreeNode pruneTree(TreeNode root) {
        if (root == null) {
            return null;
        }
        root.left = pruneTree(root.left);
        root.right = pruneTree(root.right);
        if (root.left == null &&  root.right == null && root.val == 0) {
            return null;
        }
        return root;
    }
}
```

### 序列化与反序列化二叉树

序列化是将一个数据结构或者对象转换为连续的比特位的操作，进而可以将转换后的数据存储在一个文件或者内存中，同时也可以通过网络传输到另一个计算机环境，采取相反方式重构得到原数据。

请设计一个算法来实现二叉树的序列化与反序列化。这里不限定你的序列 / 反序列化算法执行逻辑，只需要保证一个二叉树可以被序列化为一个字符串并且将这个字符串反序列化为原始的树结构。

![序列化与反序列化二叉树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/48.jpg)

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
        if (root == null) {
            return "#";
        }
        String leftS = serialize(root.left);
        String rightS = serialize(root.right);
        return String.valueOf(root.val) + "," + leftS + "," + rightS;
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] strs = data.split(",");
        int[] i = {0};
        return dfs(strs, i);
    }
    public TreeNode dfs(String[] strs, int[] i) {
        String s = strs[i[0]];
        i[0] ++;
        if (s.equals("#")) {
            return null;
        }
        TreeNode node = new TreeNode(Integer.valueOf(s));
        node.left = dfs(strs, i);
        node.right = dfs(strs, i);
        return node;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// TreeNode ans = deser.deserialize(ser.serialize(root));
```

### 从根节点到叶节点的路径数字之和

给定一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。

每条从根节点到叶节点的路径都代表一个数字：

- 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
计算从根节点到叶节点生成的 **所有数字之和** 。

**叶节点** 是指没有子节点的节点。

![从根节点到叶节点的路径数字之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/49.jpg)

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
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }
    public int dfs(TreeNode root, int sum) {
        if (root == null) {
            return 0;
        }
        sum = sum * 10 + root.val; 
        if (root.left == null && root.right == null) {
            return sum;
        }
        return dfs(root.left, sum) + dfs(root.right, sum);
    }
}
```

### 二叉树中的最大路径和

路径 被定义为一条从树中任意节点出发，沿父节点-子节点连接，达到任意节点的序列。同一个节点在一条路径序列中 至多出现一次 。该路径 至少包含一个 节点，且不一定经过根节点。

路径和 是路径中各节点值的总和。

给定一个二叉树的根节点 root ，返回其 最大路径和，即所有路径上节点值之和的最大值。

![二叉树中的最大路径和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/51.jpg)

不使用全局变量

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
// f(u) = f(u.left) + f(u.right) + u.val 最大路径和等于左子树最大 + 右子树最大 + 当前节点值
class Solution {
    public int maxPathSum(TreeNode root) {
        int[] maxSum = {Integer.MIN_VALUE};
        dfs(root, maxSum);
        return maxSum[0];
    }
    public int dfs(TreeNode root, int[] maxSum) {
        if (root == null) {
            return 0;
        }
        int[] maxSumLeft = {Integer.MIN_VALUE};
        int left = Math.max(0, dfs(root.left, maxSumLeft));

        int[] maxSumRight = {Integer.MIN_VALUE};
        int right = Math.max(0, dfs(root.right, maxSumRight));

        maxSum[0] = Math.max(maxSumLeft[0], maxSumRight[0]);
        maxSum[0] = Math.max(maxSum[0], root.val + left + right);

        return root.val + Math.max(left, right);

    }
}
```

使用全局变量

```java
class Solution {
    int ans;
    public int maxPathSum(TreeNode root) {
        ans = Integer.MIN_VALUE;
        dfs(root);
        return ans;
    }
    public int dfs(TreeNode root) {
        if (root == null) {
            return 0;
        }
        int left = Math.max(0, dfs(root.left));
        int right = Math.max(0, dfs(root.right));

        ans = Math.max(ans, left + right + root.val);
        return root.val + Math.max(left, right);
    }

}
```

### 向下的路径节点之和

给定一个二叉树的根节点 root ，和一个整数 targetSum ，求该二叉树里节点值之和等于 targetSum 的 路径 的数目。

**路径** 不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。

![向下的路径节点之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/50.jpg)

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
    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> map = new HashMap<>();
        map.put(0L, 1);
        return dfs(root, targetSum, map, 0L);
    }
    public int dfs(TreeNode root, int targetSum, Map<Long, Integer> map, Long path) {
        if (root == null) {
            return 0;
        }
        path += root.val;
        int cnt = map.getOrDefault(path - targetSum, 0);
        map.put(path, map.getOrDefault(path, 0) + 1);

        cnt += dfs(root.left, targetSum, map, path);
        cnt += dfs(root.right, targetSum, map, path);

        map.put(path, map.get(path) - 1);
        return cnt;
    }
}
```

### 展平二叉搜索树

给你一棵二叉搜索树，请 按中序遍历 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。

![展平二叉搜索树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/52.jpg)

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
    public TreeNode increasingBST(TreeNode root) {
        TreeNode cur = root, prev = null, first = null;
        Stack<TreeNode> st = new Stack<>();
        while (cur != null || !st.isEmpty()) {
            while (cur != null) {
                st.push(cur);
                cur = cur.left;
            }
            cur = st.pop();
            System.out.println(cur.val);
            if (prev != null) {
                prev.right = cur;
            } else {
                first = cur;
            }
            prev = cur;
            cur.left = null;
            cur = cur.right;
        }
        return first;
    }
}
```

### 二叉搜索树中的中序后继

给定一棵二叉搜索树和其中的一个节点 p ，找到该节点在树中的中序后继。如果节点没有中序后继，请返回 null 。

节点 p 的后继是值比 p.val 大的节点中键值最小的节点，即按中序遍历的顺序节点 p 的下一个节点。

![二叉搜索树中的中序后继](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/53.jpg)

**时间复杂度O(n)**

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
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        Stack<TreeNode> st = new Stack<>();
        var cur = root;
        boolean found = false;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) {
                st.push(cur);
                cur = cur.left;
            }
            cur = st.pop();
            if (found) {
                break;
            } else if (cur == p) {
                found = true;
            }
            cur = cur.right;
        }
        return cur;
    }
}
```

**时间复杂度O(h)**

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
    public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
        TreeNode cur = root, res = null;
        while (cur != null) {
            if (cur.val > p.val) {
                res = cur;
                cur = cur.left;
            } else {
                cur = cur.right;
            }
        }
        return res;
    }
}
```

### 所有大于等于节点的值之和

给定一个二叉搜索树，请将它的每个节点的值替换成树中大于或者等于该节点值的所有节点值之和。

提醒一下，二叉搜索树满足下列约束条件：

- 节点的左子树仅包含键 小于 节点键的节点。
- 节点的右子树仅包含键 大于 节点键的节点。
- 左右子树也必须是二叉搜索树。

![所有大于等于节点的值之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/54.jpg)

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
    public TreeNode convertBST(TreeNode root) {
        Stack<TreeNode> st = new Stack<>();
        var cur = root;
        int sum = 0;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) {
                st.push(cur);
                cur = cur.right;
            }
            cur = st.pop();
            sum += cur.val;
            cur.val = sum;
            cur = cur.left;
        }
        return root;
    }
}
```

### 二叉搜索树迭代器

实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：

- BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
- boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
- int next()将指针向右移动，然后返回指针处的数字。
注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。

可以假设 next() 调用总是有效的，也就是说，当调用 next() 时，BST 的中序遍历中至少存在一个下一个数字。

![二叉搜索树迭代器](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/55.jpg)

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
class BSTIterator {
    
    TreeNode cur;
    Stack<TreeNode> st;
    public BSTIterator(TreeNode root) {
        cur = root;
        st = new Stack<>();
    }
    
    public int next() {
        while (cur != null) {
            st.push(cur);
            cur = cur.left;
        }
        cur = st.pop();
        int res = cur.val;
        cur = cur.right;
        return res;
    }
    
    public boolean hasNext() {
        return cur != null || !st.isEmpty();
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */
```

### 二叉搜索树中两个节点之和

给定一个二叉搜索树的 根节点 root 和一个整数 k , 请判断该二叉搜索树中是否存在两个节点它们的值之和等于 k 。假设二叉搜索树中节点的值均唯一。

![二叉搜索树中两个节点之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/56.jpg)

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
    public boolean findTarget(TreeNode root, int k) {
        Set<Integer> set = new HashSet<>();
        Stack<TreeNode> st = new Stack<>();
        var cur = root;
        while (cur != null || !st.isEmpty()) {
            while (cur != null) {
                st.push(cur);
                cur = cur.left;
            }
            cur = st.pop();
            if (set.contains(k - cur.val)) {
                return true;
            }
            set.add(cur.val);
            cur = cur.right;
        }
        return false;
    }
}
```

### 值和下标之差都在给定的范围内

给你一个整数数组 nums 和两个整数 k 和 t 。请你判断是否存在 两个不同下标 i 和 j，使得 abs(nums[i] - nums[j]) <= t ，同时又满足 abs(i - j) <= k 。

如果存在则返回 true，不存在返回 false。

![值和下标之差都在给定的范围内](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/57.jpg)

**使用TreeSet二叉搜索树 时间复杂度O(nlogk)**

| 函数名  | 描述                         |
| ------- | ---------------------------- |
| floor   | 获取键小于等于给定值的最大键 |
| ceiling | 获取键大于等于给定值的最小值 |

```java
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        TreeSet<Long> set = new TreeSet<>();
        for (int i = 0; i < nums.length; i ++) {
            Long lower = set.floor((long) nums[i]);
            if (lower != null && lower >= (long) nums[i] - t) {
                return true;
            }
            Long upper = set.ceiling((long) nums[i]);
            if (upper != null && upper <= (long) nums[i] + t) {
                return true;
            }
            set.add((long) nums[i]);
            if (i >= k) {
                set.remove((long) nums[i - k]);
            }
        }
        return false;
    }
}
```

**使用桶 时间复杂度O(n)**

```java
class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        Map<Integer, Integer> buckets = new HashMap<>();
        int bucketSize = t + 1;
        for (int i = 0; i < nums.length; i ++) {
            int x = nums[i];
            int id = getBucketId(x, bucketSize);
            if (buckets.containsKey(id) 
            || (buckets.containsKey(id - 1) && buckets.get(id - 1) + t >= x) 
            || (buckets.containsKey(id + 1) && buckets.get(id + 1) - t <= x)) {
                return true;
            }
            buckets.put(id, x);
            if (i >= k) {
                buckets.remove(getBucketId(nums[i - k], bucketSize));
            }
        }
        return false;
    }
    public int getBucketId(int x, int bucketSize) {
        return x >= 0 ? x / bucketSize : (x + 1) / bucketSize - 1;
    }
}
```

### 日程表

请实现一个 MyCalendar 类来存放你的日程安排。如果要添加的时间内没有其他安排，则可以存储这个新的日程安排。

MyCalendar 有一个 book(int start, int end)方法。它意味着在 start 到 end 时间内增加一个日程安排，注意，这里的时间是半开区间，即 [start, end), 实数 x 的范围为，  start <= x < end。

当两个日程安排有一些时间上的交叉时（例如两个日程安排都在同一时间内），就会产生重复预订。

每次调用 MyCalendar.book方法时，如果可以将日程安排成功添加到日历中而不会导致重复预订，返回 true。否则，返回 false 并且不要将该日程安排添加到日历中。

请按照以下步骤调用 MyCalendar 类: `MyCalendar cal = new MyCalendar(); MyCalendar.book(start, end)`

![日程表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/58.jpg)

```java
class MyCalendar {

    TreeMap<Integer, Integer> events;

    public MyCalendar() {
        events = new TreeMap<>();
    }
    
    public boolean book(int start, int end) {
        var event = events.floorEntry(start);
        if (event != null && event.getValue() > start) {
            return false;
        }
        event = events.ceilingEntry(start);
        if (event != null && event.getKey() < end) {
            return false;
        }
        events.put(start, end);
        return true;
    }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * MyCalendar obj = new MyCalendar();
 * boolean param_1 = obj.book(start,end);
 */
```

## 堆

### 数据流中的第 K 大元素

![数据流中的第 K 大元素](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/59.jpg)

设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。

请实现 KthLargest 类：

- `KthLargest(int k, int[] nums)` 使用整数 k 和整数流 nums 初始化对象。
- `int add(int val)` 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。

```java
class KthLargest {

    int size;
    PriorityQueue<Integer> minHeap; 
    public KthLargest(int k, int[] nums) {
        size = k;
        minHeap = new PriorityQueue<>();
        for (int item : nums) {
            add(item);
        }
    }
    
    public int add(int val) {
        if (minHeap.size() < size) {
            minHeap.offer(val);
        } else if (val > minHeap.peek()) {
            minHeap.poll();
            minHeap.offer(val);
        }
        return minHeap.peek();
    }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * KthLargest obj = new KthLargest(k, nums);
 * int param_1 = obj.add(val);
 */
```

### 出现频率最高的 k 个数字

给定一个整数数组 nums 和一个整数 k ，请返回其中出现频率前 k 高的元素。可以按 任意顺序 返回答案。

![出现频率最高的 k 个数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/60.jpg)

```java
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int item : nums) {
            map.put(item, map.getOrDefault(item, 0) + 1);
        }
        Queue<Map.Entry<Integer, Integer>> minHeap = new PriorityQueue<>((e1, e2) -> e1.getValue() - e2.getValue());
        for (var entry : map.entrySet()) {
            if (minHeap.size() < k) {
                minHeap.offer(entry);
            } else if (minHeap.peek().getValue() < entry.getValue()) {
                minHeap.poll();
                minHeap.offer(entry);
            }
        }
        int[] res = new int[k];
        for (int i = 0; i < k; i ++) {
            res[i] = minHeap.poll().getKey();
        }
        return res;
    }
}
```

### 和最小的 k 个数对

给定两个以升序排列的整数数组 nums1 和 nums2 , 以及一个整数 k 。

定义一对值 (u,v)，其中第一个元素来自 nums1，第二个元素来自 nums2 。

请找到和最小的 k 个数对 (u1,v1),  (u2,v2)  ...  (uk,vk) 。

![和最小的 k 个数对](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/61.jpg)

**使用大根堆 时间复杂度O(k^2logk)**

```java
class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        Queue<int[]> maxHeap = new PriorityQueue<>((e1, e2) -> e2[0] + e2[1] - e1[0] - e1[1]);
        for (int i = 0; i < Math.min(k, nums1.length); i ++) {
            for (int j = 0; j < Math.min(k, nums2.length); j ++) {
                if (maxHeap.size() >= k) {
                    var x = maxHeap.peek();
                    if (x[0] + x[1] > nums1[i] + nums2[j]) {
                        maxHeap.poll();
                        maxHeap.offer(new int[]{nums1[i], nums2[j]});
                    }
                } else {
                    maxHeap.offer(new int[]{nums1[i], nums2[j]});
                }
            }
        }
        List<List<Integer>> res = new LinkedList<>();
        while (!maxHeap.isEmpty()) {
            var arr = maxHeap.poll();
            res.add(Arrays.asList(arr[0], arr[1]));
        }
        return res;
    }
}
```

**使用小根堆 时间复杂度O(klogk)**

```java
class Solution {
    public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        Queue<int[]> minHeap = new PriorityQueue<>((p1, p2) -> nums1[p1[0]] + nums2[p1[1]] - nums1[p2[0]] - nums2[p2[1]]);
        if (nums2.length > 0) {
            for (int i = 0; i < Math.min(k, nums1.length); i ++) {
                minHeap.offer(new int[]{i, 0});
            }
        }
        List<List<Integer>> res = new ArrayList<>();
        while (k -- > 0 && !minHeap.isEmpty()) {
            var ids = minHeap.poll();
            res.add(Arrays.asList(nums1[ids[0]], nums2[ids[1]]));
            if (ids[1] < nums2.length - 1) {
                minHeap.offer(new int[]{ids[0], ids[1] + 1});
            }
        }
        return res;
    }
}
```

## 前缀树

### 实现前缀树

Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

请你实现 Trie 类：

- `Trie()` 初始化前缀树对象。
- `void insert(String word)` 向前缀树中插入字符串 word 。
- `boolean search(String word)` 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
- `boolean startsWith(String prefix)` 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。

![实现前缀树](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/62.jpg)

```java
class Trie {

    static class TrieNode {
        boolean isWord;
        TrieNode[] children;

        public TrieNode() {
            children = new TrieNode[26];
        }
    }
    TrieNode root;
    /** Initialize your data structure here. */
    public Trie() {
        root = new TrieNode();
    }
    
    /** Inserts a word into the trie. */
    public void insert(String word) {
        var cur = root;
        for(char c : word.toCharArray()) {
            if(cur.children[c - 'a'] == null) {
                cur.children[c - 'a'] = new TrieNode();
            }
            cur = cur.children[c - 'a'];
        }
        cur.isWord = true;
    }
    
    /** Returns if the word is in the trie. */
    public boolean search(String word) {
        var cur = root;
        for(char c : word.toCharArray()) {
            if (cur.children[c - 'a'] == null) {
                return false;
            }
            cur = cur.children[c - 'a'];
        }
        return cur.isWord;
    }
    
    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) {
        var cur = root;
        for (char c : prefix.toCharArray()) {
            if (cur.children[c - 'a'] == null) {
                return false;
            }
            cur = cur.children[c - 'a'];
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

### 替换单词

在英语中，有一个叫做 词根(root) 的概念，它可以跟着其他一些词组成另一个较长的单词——我们称这个词为 继承词(successor)。例如，词根an，跟随着单词 other(其他)，可以形成新的单词 another(另一个)。

现在，给定一个由许多词根组成的词典和一个句子，需要将句子中的所有继承词用词根替换掉。如果继承词有许多可以形成它的词根，则用最短的词根替换它。

需要输出替换之后的句子。

![替换单词](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/63.jpg)

```java
class Solution {
    static class TrieNode{
        boolean isWord;
        TrieNode[] children;
        public TrieNode() {
            children = new TrieNode[26];
        }
    }
    public TrieNode buildTrie(List<String> dictionary) {
        TrieNode root = new TrieNode();
        for (String word : dictionary) {
            var cur = root;
            for (char c : word.toCharArray()) {
                if (cur.children[c - 'a'] == null) {
                    cur.children[c - 'a'] = new TrieNode();
                }
                cur = cur.children[c - 'a'];
            }
            cur.isWord = true;
        }
        return root;
    }
    public String findPrefix(TrieNode root, String word) {
        TrieNode cur = root;
        StringBuilder sb = new StringBuilder();
        for (char c : word.toCharArray()) {
            if (cur.isWord || cur.children[c - 'a'] == null) {
                break;
            }
            sb.append(c);
            cur = cur.children[c - 'a'];
        }
        return cur.isWord ? sb.toString() : "";
    }
    public String replaceWords(List<String> dictionary, String sentence) {
        TrieNode root = buildTrie(dictionary);
        String[] words = sentence.split(" ");
        for (int i = 0; i < words.length; i ++) {
            String prefix = findPrefix(root, words[i]);
            if (!prefix.isEmpty()) {
                words[i] = prefix;
            }
        }
        return String.join(" ", words);
    }
}
```

### 神奇的字典

设计一个使用单词列表进行初始化的数据结构，单词列表中的单词 互不相同 。 如果给出一个单词，请判定能否只将这个单词中一个字母换成另一个字母，使得所形成的新单词存在于已构建的神奇字典中。

实现` MagicDictionary `类：

- `MagicDictionary() `初始化对象
- `void buildDict(String[] dictionary) `使用字符串数组 dictionary 设定该数据结构，dictionary 中的字符串互不相同
- `bool search(String searchWord) `给定一个字符串 searchWord ，判定能否只将字符串中 一个 字母换成另一个字母，使得所形成的新字符串能够与字典中的任一字符串匹配。如果可以，返回 true ；否则，返回 false 。

![神奇的字典](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/64.jpg)

```java
class MagicDictionary {

    static class TrieNode {
        boolean isWord;
        TrieNode[] children;

        public TrieNode() {
            children = new TrieNode[26];
        }
    }
    TrieNode root;
    /** Initialize your data structure here. */
    public MagicDictionary() {
        root = new TrieNode();
    }
    
    public void buildDict(String[] dictionary) {
        for (String word : dictionary) {
            var cur = root;
            for (char c : word.toCharArray()) {
                if (cur.children[c - 'a'] == null) {
                    cur.children[c - 'a'] = new TrieNode();
                }
                cur = cur.children[c - 'a'];
            }
            cur.isWord = true;
        }
    }
    
    public boolean search(String searchWord) {
        return dfs(root, searchWord, 0, 0);
    }
    public boolean dfs(TrieNode root, String word, int i, int edit) {
        if (root == null || edit > 1) {
            return false;
        }
        if (root.isWord && i == word.length() && edit == 1) {
            return true;
        }
        if (i < word.length() && edit <= 1) {
            boolean found = false;
            for (int j = 0; j < 26 && !found; j ++) {
                int next = j == word.charAt(i) - 'a' ? edit : edit + 1;
                found = dfs(root.children[j], word, i + 1, next);
            }
            return found;
        }
        return false;
    }
}

/**
 * Your MagicDictionary object will be instantiated and called as such:
 * MagicDictionary obj = new MagicDictionary();
 * obj.buildDict(dictionary);
 * boolean param_2 = obj.search(searchWord);
 */
```

### 最短的单词编码

单词数组 words 的 有效编码 由任意助记字符串 s 和下标数组 indices 组成，且满足：

- `words.length == indices.length`
- 助记字符串 s 以 '#' 字符结尾
- 对于每个下标 indices[i] ，s 的一个从 indices[i] 开始、到下一个 '#' 字符结束（但不包括 '#'）的 子字符串 恰好与 words[i] 相等

给定一个单词数组 words ，返回成功对 words 进行编码的最小助记字符串 s 的长度 。

![最短的单词编码](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/65.jpg)

```java
class Solution {
    static class TrieNode {
        TrieNode[] children;
        public TrieNode() {
            children = new TrieNode[26];
        }
    }
    public TrieNode buildTrie(String[] words) {
        var root = new TrieNode();
        for (String word : words) {
            var cur = root;
            for (int i = word.length() - 1; i >= 0; i --) {
                char c = word.charAt(i);
                if (cur.children[c - 'a'] == null) {
                    cur.children[c - 'a'] = new TrieNode();
                }
                cur = cur.children[c - 'a'];
            }
        }
        return root;
    }
    public int minimumLengthEncoding(String[] words) {
        var root = buildTrie(words);

        int[] total = {0};
        dfs(root, 1, total);
        return total[0];
    }
    public void dfs(TrieNode root, int length, int[] total) {
        boolean isLeaf = true;
        for (var child : root.children) {
            if (child != null) {
                isLeaf = false;
                dfs(child, length + 1, total);
            }
        }
        if (isLeaf) {
            total[0] += length;
        }
    }
}
```

### 单词之和

实现一个 MapSum 类，支持两个方法，insert 和 sum：

- `MapSum() `初始化 MapSum 对象
- `void insert(String key, int val) `插入 key-val 键值对，字符串表示键 key ，整数表示值 val 。如果键 key 已经存在，那么原来的键值对将被替代成新的键值对。
- `int sum(string prefix) `返回所有以该前缀 prefix 开头的键 key 的值的总和。

![单词之和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/66.jpg)

```java
class MapSum {
    static class TrieNode {
        int val;
        TrieNode[] children;
        public TrieNode() {
            children = new TrieNode[26];
        }
    }
    TrieNode root;

    /** Initialize your data structure here. */
    public MapSum() {
        root = new TrieNode();
    }
    
    public void insert(String key, int val) {
        var cur = root;
        for (char c : key.toCharArray()) {
            if (cur.children[c - 'a'] == null) {
                cur.children[c - 'a'] = new TrieNode();
            }
            cur = cur.children[c - 'a'];
        }
        cur.val = val;
    }
    
    public int sum(String prefix) {
        var cur = root;
        for (char c : prefix.toCharArray()) {
            if (cur.children[c - 'a'] == null) {
                return 0;
            }
            cur = cur.children[c - 'a'];
        }
        return getSum(cur);
    }

    public int getSum(TrieNode root) {
        if (root == null) {
            return 0;
        }
        int res = root.val;
        for (var child : root.children) {
            res += getSum(child);
        }
        return res;
    }
}

/**
 * Your MapSum object will be instantiated and called as such:
 * MapSum obj = new MapSum();
 * obj.insert(key,val);
 * int param_2 = obj.sum(prefix);
 */
```

### 最大的异或

给你一个整数数组` nums `，返回` nums[i] XOR nums[j] `的最大运算结果，其中` 0 ≤ i ≤ j < n `。

![最大的异或](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/67.jpg)

```java
class Solution {
    static class TrieNode {
        TrieNode[] children;
        public TrieNode() {
            children = new TrieNode[2];
        }
    }
    public TrieNode buildTrie(int[] nums) {
        var root = new TrieNode();
        for (int x : nums) {
            var cur = root;
            for (int i = 31; i >= 0; i --) {
                int bit = (x >> i) & 1;
                if (cur.children[bit] == null) {
                    cur.children[bit] = new TrieNode();
                }
                cur = cur.children[bit];
            }
        }
        return root;
    }
    public int findMaximumXOR(int[] nums) {
        var root = buildTrie(nums);
        int ans = 0;
        for (int x : nums) {
            int xor = 0;
            var cur = root;
            for (int i = 31; i >= 0; i --) {
                int bit = (x >> i) & 1;
                if (cur.children[1 - bit] != null) {
                    xor = (xor << 1) + 1;
                    cur = cur.children[1 - bit];
                } else {
                    xor = xor << 1;
                    cur = cur.children[bit];
                }
            }
            ans = Math.max(ans, xor);
        }
        return ans;
    }
}
```

## 二分查找

### 查找插入位置

给定一个排序的整数数组 nums 和一个整数目标值 target ，请在数组中找到 target ，并返回其下标。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为` O(log n) `的算法。

![查找插入位置](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/68.jpg)

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int n = nums.length;
        int l = 0, r = n - 1;
        while (l < r) {
            int mid = l + r >> 1;
            if(target > nums[mid]) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l == n - 1 && nums[l] < target ? n : l;
    }
}
```

### 山峰数组的顶部

符合下列属性的数组 arr 称为 山峰数组（山脉数组） ：

- `arr.length >= 3`
-存在 i（0 < i < arr.length - 1）使得：
  - `arr[0] < arr[1] < ... arr[i-1] < arr[i]` 
  - `arr[i] > arr[i+1] > ... > arr[arr.length - 1]`

给定由整数组成的山峰数组 arr ，返回任何满足 `arr[0] < arr[1] < ... arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1] `的下标 i ，即山峰顶部。

![山峰数组的顶部](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/69.jpg)

```java
class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        int n = arr.length;
        int l = 1, r = n - 2;
        while (l <= r) {
            int mid = l + r >> 1;
            if (arr[mid - 1] < arr[mid] && arr[mid] > arr[mid + 1]) {
                return mid;
            }
            if (arr[mid + 1] > arr[mid]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return -1;
    }
}
```

### 排序数组中只出现一次的数字

给定一个只包含整数的有序数组 nums ，每个元素都会出现两次，唯有一个数只会出现一次，请找出这个唯一的数字。

你设计的解决方案必须满足` O(log n) `时间复杂度和` O(1) `空间复杂度。

![排序数组中只出现一次的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/70.jpg)

```java
class Solution {
    public int singleNonDuplicate(int[] nums) {
        int n = nums.length;
        int l = 0, r = n >> 1;
        while (l <= r) {
            int mid = l + r >> 1;
            int i = mid << 1;
            if (i < n - 1 && nums[i] != nums[i + 1]) {
                if (mid == 0 || nums[i - 2] == nums[i - 1]) {
                    return nums[i];
                }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return nums[n - 1];
    }
}
```

### 按权重生成随机数

给定一个正整数数组 w ，其中 w[i] 代表下标 i 的权重（下标从 0 开始），请写一个函数 pickIndex ，它可以随机地获取下标 i，选取下标 i 的概率与 w[i] 成正比。

例如，对于 `w = [1, 3]`，挑选下标 0 的概率为 `1 / (1 + 3) = 0.25 `（即，25%），而选取下标 1 的概率为 `3 / (1 + 3) = 0.75`（即，75%）。

也就是说，选取下标 i 的概率为 `w[i] / sum(w)` 。

![按权重生成随机数](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/71.jpg)

```java
class Solution {

    int[] sum;
    int total = 0;

    public Solution(int[] w) {
        sum = new int[w.length];
        for (int i = 0; i < w.length; i ++) {
            total += w[i];
            sum[i] = total;
        }
    }
    
    public int pickIndex() {
        int x = (int)(Math.random() * total) + 1;
        return binarySearch(x);
    }

    public int binarySearch(int x) {
        int l = 0, r = sum.length - 1;
        while (l < r) {
            int mid = l + (r - l) / 2;
            if (sum[mid] < x) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(w);
 * int param_1 = obj.pickIndex();
 */
```

### 求平方根

给定一个非负整数 x ，计算并返回 x 的平方根，即实现` int sqrt(int x) `函数。

正数的平方根有两个，只输出其中的正数平方根。

如果平方根不是整数，输出只保留整数的部分，小数部分将被舍去。

![求平方根](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/72.jpg)

```java
class Solution {
    public int mySqrt(int x) {
        int l = 1, r = x;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (mid <= x / mid) {
                if ((mid + 1) > x / (mid + 1)) {
                    return mid;
                }
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        return 0;
    }
}
```

### 狒狒吃香蕉

狒狒喜欢吃香蕉。这里有 n 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 h 小时后回来。

狒狒可以决定她吃香蕉的速度 k （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 k 根。如果这堆香蕉少于 k 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉，下一个小时才会开始吃另一堆的香蕉。  

狒狒喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

返回她可以在 h 小时内吃掉所有香蕉的最小速度 k（k 为整数）。

![狒狒吃香蕉](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/73.jpg)

```java
class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int l = 1, r = Arrays.stream(piles).max().getAsInt();
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (getHours(piles, mid) <= h) {
                if (mid == 1 || getHours(piles, mid - 1) > h) {
                    return mid;
                }
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }
        return -1;
    }

    public int getHours(int[] piles, int speed) {
        int res = 0;
        for (int pile : piles) {
            res += (pile + speed - 1) / speed;
        }
        return res;
    }
}
```

### 合并区间

以数组 intervals 表示若干个区间的集合，其中单个区间为 `intervals[i] = [starti, endi]` 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

![合并区间](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/74.jpg)

```java
class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (i1, i2) -> i1[0] - i2[0]);
        var cur = intervals[0];
        List<int[]> ans = new ArrayList<>();
        for (int i = 1; i < intervals.length; i ++) {
            if (cur[1] >= intervals[i][0]) {
                cur[1] = Math.max(cur[1], intervals[i][1]);
            } else {
                ans.add(cur);
                cur = intervals[i];
            }
        }
        if (cur != null) {
            ans.add(cur);
        }
        return ans.toArray(new int[ans.size()][]);
    }
}
```

### 数组相对排序

给定两个数组，arr1 和 arr2，

- arr2 中的元素各不相同
- arr2 中的每个元素都出现在 arr1 中

对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

![数组相对排序](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/75.jpg)

```java
class Solution {
    public int[] relativeSortArray(int[] arr1, int[] arr2) {
        int[] count = new int[1001];
        int k = 0;
        int[] ans = new int[arr1.length];
        for (int item : arr1) {
            count[item] ++;
        }
        for (int item : arr2) {
            while (count[item] > 0) {
                ans[k ++] = item;
                count[item] --;
            }
        }
        for (int i = 0; i < count.length; i ++) {
            while (count[i] > 0) {
                ans[k ++] = i;
                count[i] --;
            }
        }
        return ans;
    }
}
```

### 数组中的第 k 大的数字

给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。

请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

![数组中的第 k 大的数字](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/76.jpg)

```java
class Solution {
    public int findKthLargest(int[] nums, int k) {
        int res = quick_sort(nums, 0, nums.length - 1, k);
        return res;
    }

    public int quick_sort(int[] nums, int l, int r, int k) {
        if (l == r) return nums[l];
        int i = l - 1, j = r + 1, x = nums[l + r >> 1];
        while (i < j) {
            while(nums[++ i] > x);
            while(nums[-- j] < x);
            if (i < j) {
                swap(nums, i, j);
            }
        }
        int sl = j - l + 1;
        if (k <= sl) {
            return quick_sort(nums, l, j, k);
        }
        return quick_sort(nums, j + 1, r, k - sl);
    }

    public void swap(int[] nums, int i, int j) {
        int t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
    }
}
```

### 链表排序

给定链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

![链表排序](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/77.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode sortList(ListNode head) {
        if(head == null || head.next == null) {
            return head;
        }
        var mid = split(head);
        var head1 = sortList(head);
        var head2 = sortList(mid);
        return merge(head1, head2);
    }

    public ListNode split(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        var res = slow.next;
        slow.next = null;
        return res;
    }

    public ListNode merge(ListNode head1, ListNode head2) {
        var dummy = new ListNode(-1);
        var cur = dummy;
        while(head1 != null && head2 != null) {
            if (head1.val < head2.val) {
                cur.next = head1;
                head1 = head1.next;
            } else {
                cur.next = head2;
                head2 = head2.next;
            }
            cur = cur.next;
        }
        cur.next = head1 != null ? head1 : head2;
        return dummy.next;
    }
}
```

### 合并排序链表

给定一个链表数组，每个链表都已经按升序排列。

请将所有链表合并到一个升序链表中，返回合并后的链表。

![合并排序链表](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/78.jpg)

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((n1, n2) -> n1.val - n2.val);
        for (ListNode node : lists) {
            while (node != null) {
                minHeap.offer(node);
                node = node.next;
            }
        }
        var dummy = new ListNode(-1);
        var cur = dummy;
        while (!minHeap.isEmpty()) {
            cur.next = minHeap.poll();
            cur = cur.next;
        }
        cur.next = null;
        return dummy.next;
    }
}
```

## 回溯法

### 所有子集

给定一个整数数组 nums ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

解集 不能 包含重复的子集。你可以按 任意顺序 返回解集。

![所有子集](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/79.jpg)

```java
class Solution {
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> subsets(int[] nums) {
        dfs(0, nums);
        return ans;
    }

    public void dfs(int u, int[] nums) {
        if (u == nums.length) {
            ans.add(new ArrayList(path));
            return;
        }
        path.add(nums[u]);
        dfs(u + 1, nums);
        path.remove(path.size() - 1);
        dfs(u + 1, nums);
    }
}
```

### 含有 k 个元素的组合

给定两个整数 n 和 k，返回` 1 ... n `中所有可能的 k 个数的组合。

![含有 k 个元素的组合](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/80.jpg)

```java
class Solution {
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> combine(int n, int k) {
        dfs(1, n, k);
        return ans;
    }

    public void dfs(int u, int n, int k) {
        if (path.size() + (n - u + 1) < k) {
            return;
        }
        if (path.size() == k) {
            ans.add(new ArrayList<>(path));
            return;
        }
        path.add(u);
        dfs(u + 1, n, k);
        path.remove(path.size() - 1);
        dfs(u + 1, n, k);
    }
}
```

### 允许重复选择元素的组合

给定一个无重复元素的正整数数组 candidates 和一个正整数 target ，找出 candidates 中所有可以使数字和为目标数 target 的唯一组合。

candidates 中的数字可以无限制重复被选取。如果至少一个所选数字数量不同，则两种组合是不同的。 

对于给定的输入，保证和为 target 的唯一组合数少于 150 个。

![允许重复选择元素的组合](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/81.jpg)

```java
class Solution {
    int n;
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        n = candidates.length;
        dfs(candidates, 0, target);
        return ans;
    }

    public void dfs(int[] candidates, int u, int target) {
        if (target <= 0) {
            if (target == 0) {
                ans.add(new ArrayList<>(path));
            }
            return;
        }
        for (int i = u; i < n; i ++) {
            path.add(candidates[i]);
            dfs(candidates, i, target - candidates[i]);
            path.remove(path.size() - 1);
        }
    }
}
```

### 含有重复元素集合的组合

给定一个可能有重复数字的整数数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次，解集不能包含重复的组合。 

![含有重复元素集合的组合](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/82.jpg)

```java
class Solution {
    int n;
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        n = candidates.length;
        Arrays.sort(candidates);
        dfs(candidates, 0, target);
        return ans;
    }

    public void dfs(int[] candidates, int u, int target) {
        if (target == 0) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = u; i < n; i ++) {
            int t = target - candidates[i];
            if (t < 0 || i > u && candidates[i - 1] == candidates[i]) {
                continue;
            }
            path.add(candidates[i]);
            dfs(candidates, i + 1, target - candidates[i]);
            path.remove(path.size() - 1);
        }
    }
}
```

### 没有重复元素集合的全排列

给定一个不含重复数字的整数数组 nums ，返回其**所有可能的全排列** 。可以 按**任意顺序** 返回答案。

![没有重复元素集合的全排列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/83.jpg)

```java
class Solution {
    int n;
    boolean[] st;
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> permute(int[] nums) {
        n = nums.length;
        st = new boolean[n];
        dfs(nums, 0);
        return ans;
    }

    public void dfs(int[] nums, int u) {
        if (u == n) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < n; i ++) {
            if (!st[i]) {
                st[i] = true;
                path.add(nums[i]);
                dfs(nums, u + 1);
                st[i] = false;
                path.remove(path.size() - 1);
            }
        }
    }
}
```

### 含有重复元素集合的全排列

给定一个可包含重复数字的整数集合 nums ，按**任意顺序** 返回它所有不重复的全排列。

![含有重复元素集合的全排列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/84.jpg)

```java
class Solution {
    int n;
    boolean[] st;
    List<Integer> path = new ArrayList<>();
    List<List<Integer>> ans = new ArrayList<>();
    public List<List<Integer>> permuteUnique(int[] nums) {
        n = nums.length;
        Arrays.sort(nums);
        st = new boolean[n];
        dfs(nums, 0);
        return ans;
    }

    public void dfs(int[] nums, int u) {
        if (u == n) {
            ans.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < n; i ++) {
            if (st[i] || i > 0 && st[i - 1] && nums[i - 1] == nums[i]) {
                continue;
            } else {
                st[i] = true;
                path.add(nums[i]);
                dfs(nums, u + 1);
                st[i] = false;
                path.remove(path.size() - 1); 
            }
        }
    }
}
```

### 生成匹配的括号

正整数 n 代表生成括号的对数，请设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

![生成匹配的括号](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/85.jpg)

```java
class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> ans = new LinkedList<>();
        dfs(n, n, "", ans);
        return ans;
    }
    public void dfs(int l, int r, String s, List<String> ans) {
        if (l == 0 && r == 0) {
            ans.add(s);
        }
        if (l >= 0) {
            dfs(l - 1, r, s + "(", ans);
        }
        if (r > l) {
            dfs(l, r - 1, s + ")", ans);
        }
    }
}
```

### 分割回文串

给定一个字符串 s ，请将 s 分割成一些子串，使每个子串都是 回文串 ，返回 s 所有可能的分割方案。

回文串 是正着读和反着读都一样的字符串。

![分割回文串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/86.jpg)

```java
class Solution {
    int n;
    boolean[][] f;
    List<String> path = new ArrayList<>();
    List<List<String>> res = new ArrayList<>();
    public String[][] partition(String s) {
        n = s.length();
        f = new boolean[n][n];
        for (int i = 0; i < n; i ++) {
            Arrays.fill(f[i], true);
        }
        for (int i = n - 1; i >= 0; i --) {
            for (int j = i + 1; j < n; j ++) {
                f[i][j] = (s.charAt(i) == s.charAt(j)) && f[i + 1][j - 1];
            }
        }
        dfs(s, 0);
        
        int rows = res.size();
        String[][] ans = new String[rows][];
        for (int i = 0; i < rows; i ++) {
            int cols = res.get(i).size();
            ans[i] = new String[cols];
            for (int j = 0; j < cols; j ++) {
                ans[i][j] = res.get(i).get(j);
            }
        }
        return ans;
    }
    void dfs(String s, int u) {
        if (u == n) {
            res.add(new ArrayList<String>(path));
            return;
        }
        for (int i = u; i < n; i ++) {
            if (f[u][i]) {
                path.add(s.substring(u, i + 1));
                dfs(s, i + 1);
                path.remove(path.size() - 1);
            }
        }
    }
}
```

### 复原 IP 地址

给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案。

有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如：`"0.1.2.201"` 和 `"192.168.1.1"` 是 有效 IP 地址，但是 `"0.011.255.245"`、`"192.168.1.312"` 和 `"192.168@1.1"` 是 无效 IP 地址。

![复原 IP 地址](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/87.jpg)

```java
class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> res = new LinkedList<>();
        dfs(0, 0, s, "", "", res);
        return res;
    }
    void dfs(int u, int segI, String s, String seg, String ip, List<String> res) {
        if (u == s.length() && segI == 3 && isValidSeg(seg)) {
            res.add(ip + seg);
        } else if (u < s.length() && segI <= 3) {
            char c = s.charAt(u);
            if (isValidSeg(seg + c)) {
                dfs(u + 1, segI, s, seg + c, ip, res);
            }
            if (seg.length() > 0 && segI < 3) {
                dfs(u + 1, segI + 1, s, "" + c, ip + seg + ".", res);
            }
        }
    }
    boolean isValidSeg(String seg) {
        return Integer.valueOf(seg) <= 255 && (seg.equals("0") || seg.charAt(0) != '0');
    }
}
```

## 动态规划

### 爬楼梯的最少成本

数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。

每当爬上一个阶梯都要花费对应的体力值，一旦支付了相应的体力值，就可以选择向上爬一个阶梯或者爬两个阶梯。

请找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。

![爬楼梯的最少成本](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/88.jpg)

```java
class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        int[] dp = new int[]{cost[0], cost[1]};
        for (int i = 2; i < n; i ++) {
            dp[i % 2] = Math.min(dp[0], dp[1]) + cost[i];
        }
        return Math.min(dp[0], dp[1]);
    }
}
```

### 打家劫舍

一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响小偷偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。**

给定一个代表每个房屋存放金额的非负整数数组 nums ，请计算 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。

![打家劫舍](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/89.jpg)

```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = nums[0];
        for (int i = 2; i <= n; i ++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 1]);
        }
        return dp[n];
    }
}
```

### 打家劫舍 II

一个专业的小偷，计划偷窃一个环形街道上沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

给定一个代表每个房屋存放金额的非负整数数组 nums ，请计算 **在不触动警报装置的情况下** ，今晚能够偷窃到的最高金额。

![打家劫舍 II](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/90.jpg)

```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) {
            return nums[0];
        } else if (n == 2) {
            return Math.max(nums[0], nums[1]);
        }
        return Math.max(helper(nums, 0, n - 2), helper(nums, 1, n - 1));
    }
    int helper(int[] nums, int start, int end) {
        int first = nums[start], second = Math.max(nums[start], nums[start + 1]);
        for (int i = start + 2; i <= end; i ++) {
            int temp = second;
            second = Math.max(first + nums[i], second);
            first = temp;
        }
        return second;
    }
}
```

### 粉刷房子

假如有一排房子，共 n 个，每个房子可以被粉刷成红色、蓝色或者绿色这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。

当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的正整数矩阵 costs 来表示的。

例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。

请计算出粉刷完所有房子最少的花费成本。

![粉刷房子](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/91.jpg)
```java
class Solution {
    public int minCost(int[][] costs) {
        /**
        f[0 1 2][i] 表示粉刷第i个房子颜色为红 蓝 绿色时的最小花费
        f[0][i] = Math.min(f[1][i - 1], f[2][i - 1]) + costs[i - 1][0];
        f[1][i] = Math.min(f[0][i - 1], f[2][i - 1]) + costs[i - 1][1];
        f[2][i] = Math.min(f[0][i - 1], f[1][i - 1]) + costs[i - 1][2];
        */
        int n = costs.length;
        // 使用滚动数组优化
        int[][] f = new int[3][2];
        for (int i = 0; i < 3; i ++) {
            f[i][0] = costs[0][i];
        }
        for (int i = 1; i < n; i ++) {
            for (int j = 0; j < 3; j ++) {
                int prev1 = f[(j + 1) % 3][(i - 1) % 2];
                int prev2 = f[(j + 2) % 3][(i - 1) % 2];
                f[j][i % 2] = Math.min(prev1, prev2) + costs[i][j];
            }       
        }
        int last = (n - 1) % 2;
        return Arrays.stream(new int[]{f[0][last], f[1][last], f[2][last]}).min().getAsInt();
    }
}
```

### 将字符串翻转到单调递增

如果一个由 '0' 和 '1' 组成的字符串，是以一些 '0'（可能没有 '0'）后面跟着一些 '1'（也可能没有 '1'）的形式组成的，那么该字符串是 单调递增 的。

我们给出一个由字符 '0' 和 '1' 组成的字符串 s，我们可以将任何 '0' 翻转为 '1' 或者将 '1' 翻转为 '0'。

返回使 s 单调递增 的最小翻转次数。

![将字符串翻转到单调递增](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/92.jpg)

使用动态规划

```java
class Solution {
    public int minFlipsMonoIncr(String s) {
        /**
        f[i] 表示以'0'结尾的前i个字符的最少翻转次数
        g[i] 表示以'1'结尾的前i个字符的最少翻转次数
        s[i] == '0':
            f[i] = f[i - 1];
            g[i] = min(g[i - 1], f[i - 1]) + 1;
        s[i] == '1':
            f[i] = f[i - 1] + 1;
            g[i] = min(g[i - 1], f[i - 1]);
        */
        int n = s.length();
        // 使用滚动数组优化
        int[][] f = new int[2][2];
        char c = s.charAt(0);
        f[0][0] = c == '0' ? 0 : 1;
        f[1][0] = c == '1' ? 0 : 1;
        for (int i = 1; i < n; i ++) {
            char ch = s.charAt(i);
            int prev0 = f[0][(i - 1) % 2];
            int prev1 = f[1][(i - 1) % 2];
            f[0][i % 2] = prev0 + (ch == '0' ? 0 : 1);
            f[1][i % 2] = Math.min(prev0, prev1) + (ch == '1' ? 0 : 1);
        }
        return Math.min(f[0][(n - 1) % 2], f[1][(n - 1) % 2]);
    }
}
```

使用前缀和

```java
class Solution {
    public int minFlipsMonoIncr(String str) {
        // 0-n 求第i个位置前面0个的数 + 后面1的个数
        int n = str.length();
        int[] s = new int[n + 1];
        for (int i = 1; i <= n; i ++) {
            s[i] = s[i - 1] + str.charAt(i - 1) - '0';
        }
        int res = n - s[n];
        for (int i = 1; i <= n; i ++) {
            res = Math.min(res, s[i] + n - i - (s[n] - s[i]));
        }
        return res;
    }
}
```

### 最长的斐波那契子序列的长度

如果序列 `X_1, X_2, ..., X_n` 满足下列条件，就说它是 斐波那契式 的：

- `n >= 3`
- 对于所有 `i + 2 <= n`，都有 `X_i + X_{i+1} = X_{i+2}`
给定一个严格递增的正整数数组形成序列 arr ，找到 arr 中最长的斐波那契式的子序列的长度。如果一个不存在，返回  0 。

（回想一下，子序列是从原序列  arr 中派生出来的，它从 arr 中删掉任意数量的元素（也可以不删），而不改变其余元素的顺序。例如， `[3, 5, 8] 是 [3, 4, 5, 6, 7, 8]` 的一个子序列）

![最长的斐波那契子序列的长度](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/93.jpg)

```java
class Solution {
    public int lenLongestFibSubseq(int[] arr) {
        /**
        f[i][j] 表示倒数第1个数是arr[i]、倒数第2个数是arr[j]的斐波那契式的最大长度
         */
        int n = arr.length;
        Map<Integer, Integer> pos = new HashMap<>();
        for (int i = 0; i < n; i ++) {
            pos.put(arr[i], i);
        }
        int res = 2;
        int[][] f = new int[n][n];
        for (int i = 1; i < n; i ++) {
            for (int j = 0; j < i; j ++) {
                int x = arr[i] - arr[j];
                int k = pos.getOrDefault(x, -1);
                f[i][j] = k >= 0 && k < j ? f[j][k] + 1 : 2;
                res = Math.max(res, f[i][j]);
            }
        }
        if (res < 3) {
            res = 0;
        }
        return res;
    }
}
```

### 分割回文串 II

给定一个字符串 s，请将 s 分割成一些子串，使每个子串都是回文串。

返回符合要求的 **最少分割次数** 。

![分割回文串 II](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/94.jpg)

```java
class Solution {
    public int minCut(String s) {
        /**
        f[i] 表示从0~i的子字符串符合条件的最少分割次数
        if j~i 是回文串:
            f[i] = Math.min(f[i], f[j - 1] + 1);
        */
        int n = s.length();
        boolean[][] isPal = new boolean[n][n];
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j <= i; j ++) {
                char c1 = s.charAt(i);
                char c2 = s.charAt(j);
                if (c1 == c2 && (i <= j + 1 || isPal[j + 1][i - 1])) {
                    isPal[j][i] = true;
                }
            }
        }
        int[] f = new int[n];
        for (int i = 0; i < n; i ++) {
            if (isPal[0][i]) {
                f[i] = 0;
            } else {
                f[i] = i;
                for (int j = 1; j <= i; j ++) {
                    if (isPal[j][i]) {
                        f[i] = Math.min(f[i], f[j - 1] + 1);
                    }
                }
            }
        }
        return f[n - 1];
    }
}
```

### 最长公共子序列

给定两个字符串 text1 和 text2，返回这两个字符串的最长 **公共子序列** 的长度。如果不存在 **公共子序列** ，返回 0 。

一个字符串的 子序列 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

- 例如，`"ace" 是 "abcde"` 的子序列，但 `"aec" 不是 "abcde" 的子序列`。
两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。

![最长公共子序列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/95.jpg)

```java
class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        /**
        f[i][j] 表示 text1(0~i) text2(0~j) 最长公共子序列长度
        if text1[i] == text2[j]:
            f[i][j] = f[i - 1][j - 1] + 1;
        else:
            f[i][j] = Math.max(f[i - 1][j], f[i][j - 1]);
        */
        int l1 = text1.length();
        int l2 = text2.length();
        if (l1 < l2) {
            return longestCommonSubsequence(text2, text1);
        }
        // 使用滚动数组
        int[][] f = new int[2][l2 + 1];
        for (int i = 0; i < l1; i ++) {
            for (int j = 0; j < l2; j ++) {
                if (text1.charAt(i) == text2.charAt(j)) {
                    f[(i + 1) % 2][j + 1] = f[i % 2][j] + 1;
                } else {
                    f[(i + 1) % 2][j + 1] = Math.max(f[i % 2][j + 1], f[(i + 1) % 2][j]);
                }
            }
        }
        return f[l1 % 2][l2];

        /**
        f[i][j] 和 f[i - 1][j] 都保存在f[j + 1] 中
        在计算f[i][j] 之前，f[j + 1] 中保存的是f[i - 1][j]的值
        在计算f[i][j] 之后，f[j + 1] 中保存的是f[i][j]的值，需要使用临时变量记录
        */
        // // 使用一维数组
        // int[] f = new int[l2 + 1];
        // for (int i = 0; i < l1; i ++) {
        //     int prev = f[0];
        //     for (int j = 0; j < l2; j ++) {
        //         int cur;
        //         if (text1.charAt(i) == text2.charAt(j)) {
        //             cur = prev + 1;
        //         } else {
        //             cur = Math.max(f[j], f[j + 1]);
        //         }
        //         prev = f[j + 1];
        //         f[j + 1] = cur;
        //     }
        // }
        // return f[l2];
    }
}
```

### 交错字符串

给定三个字符串 s1、s2、s3，请判断 s3 能不能由 s1 和 s2 交织（交错） 组成。

两个字符串 s 和 t 交织 的定义与过程如下，其中每个字符串都会被分割成若干 非空 子字符串：

- `s = s1 + s2 + ... + sn`
- `t = t1 + t2 + ... + tm`
- `|n - m| <= 1`
交织 是 `s1 + t1 + s2 + t2 + s3 + t3 + ...` 或者 `t1 + s1 + t2 + s2 + t3 + s3 + ...`
提示：a + b 意味着字符串 a 和 b 连接。

![交错字符串](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/96.jpg)

```java
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        /**
        f[i][j] 表示s1中0~i s2中0~j 是否可以交织为s3 0~i+j+1
        f[i][j] = f[i - 1][j], s1[i] == s3[i + j + 1]
        f[i][j] = f[i][j - 1], s2[i] == s3[i + j + 1]
        */
        int len1 = s1.length();
        int len2 = s2.length();
        if (len1 + len2 != s3.length()) {
            return false;
        }
        if (len1 < len2) {
            return isInterleave(s2, s1, s3);
        }
        // 使用滚动数组
        boolean[][] f = new boolean[2][len2 + 1];
        f[0][0] = true;
        for (int j = 0; j < len2; j ++) {
            f[0][j + 1] = s2.charAt(j) == s3.charAt(j) && f[0][j];
        }
        for (int i = 0; i < len1; i ++) {
            f[(i + 1) % 2][0] = s1.charAt(i) == s3.charAt(i) && f[i % 2][0];
            for (int j = 0; j < len2; j ++) {
                char c1 = s1.charAt(i);
                char c2 = s2.charAt(j);
                char c3 = s3.charAt(i + j + 1);
                f[(i + 1) % 2][j + 1] = (c1 == c3 && f[i % 2][j + 1]) || (c2 == c3 && f[(i + 1) % 2][j]);
            }
        }
        return f[len1 % 2][len2];
    }
}
```

### 不同的子序列

给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。

字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，**"ACE"** 是 **"ABCDE"** 的一个子序列，而 **"AEC"** 不是）

题目数据保证答案符合 32 位带符号整数范围。

![不同的子序列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/97.jpg)

```java
class Solution {
    public int numDistinct(String s, String t) {
        /**
        f[i][j] 表示 在s(0-i)的子序列中 t(0-j) 出现的个数
        f[i][j] = f[i][j - 1]), s[i] != t[j]
        f[i][j] = f[i][j - 1] + f[i - 1][j - 1], s[i] == t[j]
        */
        int l1 = s.length();
        int l2 = t.length();
        int[] f = new int[l2 + 1];
        f[0] = l1 > 0 ? 1 : 0;
        for (int i = 0; i < l1; i ++) {
            for (int j = Math.min(i, l2 - 1); j >= 0; j --) {
                if (s.charAt(i) == t.charAt(j)) {
                    f[j + 1] += f[j];
                }
            }
        }
        return f[l2];
    }
}
```

### 不同路径

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

![不同路径](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/98.jpg)

```java
class Solution {
    public int uniquePaths(int m, int n) {
        /**
        f[i][j] = f[i - 1][j] + f[i][j - 1];
        */
        int[][] f = new int[m][n];
        Arrays.fill(f[0], 1);
        for (int i = 1; i < m; i ++) {
            f[i][0] = 1;
        }
        for (int i = 1; i < m; i ++) {
            for (int j = 1; j < n; j ++) {
                f[i][j] = f[i - 1][j] + f[i][j - 1];
            }
        }
        return f[m - 1][n - 1];
        
        // // 使用一维数组
        // int[] f = new int[n];
        // Arrays.fill(f, 1);
        // for (int i = 1; i < m; i ++) {
        //     for (int j = 1; j < n; j ++) {
        //         f[j] += f[j - 1];
        //     }
        // }
        // return f[n - 1];
    }
}
```

### 最小路径和

给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：**一个机器人每次只能向下或者向右移动一步。

![最小路径和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/99.jpg)

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] f = new int[n][m];
        f[0][0] = grid[0][0];
        for (int j = 1; j < m; j ++) {
            f[0][j] = f[0][j - 1] + grid[0][j];
        }
        for (int i = 1; i < n; i ++) {
            f[i][0] = f[i - 1][0] + grid[i][0];
            for (int j = 1; j < m; j ++) {
                f[i][j] = Math.min(f[i - 1][j], f[i][j - 1]) + grid[i][j];
            }
        }
        return f[n - 1][m - 1];
        
        // //使用一维数组
        // int[] f = new int[m];
        // f[0] = grid[0][0];
        // for (int j = 1; j < m; j ++) {
        //     f[j] = f[j - 1] + grid[0][j];
        // }
        // for (int i = 1; i < n; i ++) {
        //     f[0] += grid[i][0];
        //     for (int j = 1; j < m; j ++) {
        //         f[j] = Math.min(f[j - 1], f[j]) + grid[i][j];
        //     }
        // }
        // return f[m - 1];
    }
}
```

### 三角形最小路径和

给定一个三角形 triangle ，找出自顶向下的最小路径和。

每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。

![三角形最小路径和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/100.jpg)

```java
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        // f[i][j] = Math.max(f[i - 1][j - 1], f[i - 1][j]);
        int[] f = new int[triangle.size()];
        for (List<Integer> row : triangle) {
            for (int j = row.size() - 1; j >= 0; j --) {
                int x = row.get(j);
                if (j == 0) {
                    f[j] += x;
                } else if (j == row.size() - 1) {
                    f[j] = f[j - 1] + x;
                } else {
                    f[j] = Math.min(f[j - 1], f[j]) + x;
                }
            }
        }
        return Arrays.stream(f).min().getAsInt();
    }
}
```

### 分割等和子集

给定一个非空的正整数数组 nums ，请判断能否将这些数字分成元素和相等的两部分。

![分割等和子集](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/101.jpg)

> 0-1 背包问题

```java
class Solution {
    public boolean canPartition(int[] nums) {
        int m = 0;
        for (int x : nums) {
            m += x;
        }
        if (m % 2 == 1) {
            return false;
        }
        m /= 2;
        int[] f = new int[m + 1];
        f[0] = 1;
        for (int x : nums) {
            for (int j = m; j >= x; j --) {
                f[j] |=  f[j - x];
            }
        }
        return f[m] != 0;
    }
}
```

### 目标和

给定一个正整数数组 nums 和一个整数 target 。

向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：

例如，**nums = [2, 1]** ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 **"+2-1"** 。
返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。

![目标和](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/102.jpg)

```java
class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        /**
        所有添加“+”的数字之和为p，添加“-”的数字之和为q， p-q=S, p+q=sum, p=(S+sum)/2
        <=> 从数组中选择和为(S+sum)/2的表达式的数目
        f[i][j] 表示 0~i 中运算结果为 j 的表达式的数目
        f[i][j] = f[i - 1][j] + f[i - 1][j - nums[i]]
        */
        int sum = 0;
        for (int x : nums) {
            sum += Math.abs(x);
        }
        if ((sum + target) % 2 == 1 || sum < Math.abs(target)) {
            return 0;
        }
        return subsetSum(nums, (sum + target) / 2);
    }
    int subsetSum(int[] nums, int target) {
        int[] f = new int[target + 1];
        f[0] = 1;
        for (int x : nums) {
            for (int j = target; j >= x; j --) {
                f[j] += f[j - x];
            }
        }
        return f[target];
    }
}
```

### 零钱兑换

给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

你可以认为每种硬币的数量是无限的。

![零钱兑换](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/103.jpg)

```java
class Solution {
    public int coinChange(int[] coins, int amount) {
        /**
        法一：
        完全背包问题
        f[i][j] 表示 编号为 0~i 的硬币，组合金额为 j 的最少硬币个数
        f[i][j] = min(f[i - 1][j - k * coins[i]] + k); k * coins[i] <= j
        法二：
        f[i] 表示凑出总额为 i 的硬币需要的最少数目
        f[i] = min(f[i - coins[j]] + 1); coins[j] <= i
        */

        // 法一
        int n = coins.length;
        int[] f = new int[amount + 1];
        Arrays.fill(f, amount + 1);
        f[0] = 0;
        for (int i = 0; i < n; i ++) {
            for (int j = amount; j >= coins[i]; j --) {
                for (int k = 1; k * coins[i] <= j; k ++) {
                    f[j] = Math.min(f[j], f[j - k * coins[i]] + k); 
                }
            }
        }

        // 法二
        int[] f = new int[amount + 1];
        for (int i = 1; i <= amount; i ++) {
            f[i] = amount + 1;
            for (int x : coins) {
                if (i >= x) {
                    f[i] = Math.min(f[i], f[i - x] + 1);
                }
            }
        }

        return f[amount] > amount ? -1 : f[amount];
    }
}
```

### 组合总和 Ⅳ

给定一个由 不同 正整数组成的数组 nums ，和一个目标整数 target 。请从 nums 中找出并返回总和为 target 的元素组合的个数。数组中的数字可以在一次排列中出现任意次，但是顺序不同的序列被视作不同的组合。

题目数据保证答案符合 32 位整数范围。

![组合总和 Ⅳ](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/104.jpg)

```java
class Solution {
    public int combinationSum4(int[] nums, int target) {
        /**
        f[i] 表示 和为 i 的组合数
        f[i] += f[i - nums[j]] nums[j] <= i
        */
        int[] f = new int[target + 1];
        f[0] = 1;
        for (int i = 1; i <= target; i ++) {
            for (int x : nums) {
                if (i >= x) {
                    f[i] += f[i - x];
                }
            }
        }
        return f[target];
    }
}
```

## 图

### 岛屿的最大面积

给定一个由 0 和 1 组成的非空二维数组 grid ，用来表示海洋岛屿地图。

一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

找到给定的二维数组中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

![105](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/105.jpg)

```java
class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int n = grid.length, m = grid[0].length;
        boolean[][] visited = new boolean[n][m];
        int ans = 0;
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j < m; j ++) {
                if (grid[i][j] == 1 && !visited[i][j]) {
                    int area = getArea(grid, visited, i, j);
                    ans = Math.max(ans, area);
                }
            }
        }
        return ans;
    }
    // 广度优先搜索
    int getArea(int[][] grid, boolean[][] visited, int i, int j) {
        Queue<int[]> queue = new LinkedList<>();
        visited[i][j] = true;
        queue.offer(new int[]{i, j});
        int area = 0;
        int n = grid.length; int m = grid[0].length;
        int[] dx = new int[]{-1, 1, 0, 0}, dy = new int[]{0, 0, -1, 1};
        while (!queue.isEmpty()) {
            var cur = queue.poll();
            area ++;
            for (int k = 0; k < 4; k ++) {
                int x = cur[0] + dx[k], y = cur[1] + dy[k];
                if (x >= 0 && x < n && y >= 0 && y < m && grid[x][y] == 1 && !visited[x][y]) {
                    visited[x][y] = true;
                    queue.offer(new int[]{x, y});
                }
            }
        }
        return area;
    }
    // 深度优先搜索
    // int getArea(int[][] grid, boolean[][] visited, int i, int j) {
    //     int area = 1;
    //     visited[i][j] = true;
    //     int n = grid.length; int m = grid[0].length;
    //     int[] dx = new int[]{-1, 1, 0, 0}, dy = new int[]{0, 0, -1, 1};

    //     for (int k = 0; k < 4; k ++) {
    //         int x = i + dx[k], y = j + dy[k];
    //         if (x >= 0 && x < n && y >= 0 && y < m && grid[x][y] == 1 && !visited[x][y]) {
    //             visited[x][y] = true;
    //             area += getArea(grid, visited, x, y);
    //         }
    //     }
    //     return area;
    // }
}
```

### 判断二分图

存在一个 无向图 ，图中有 n 个节点。其中每个节点都有一个介于 0 到 n - 1 之间的唯一编号。

给定一个二维数组 graph ，表示图，其中 graph[u] 是一个节点数组，由节点 u 的邻接节点组成。形式上，对于 graph[u] 中的每个 v ，都存在一条位于节点 u 和节点 v 之间的无向边。该无向图同时具有以下属性：

- 不存在自环（graph[u] 不包含 u）。
- 不存在平行边（graph[u] 不包含重复值）。
- 如果 v 在 graph[u] 内，那么 u 也应该在 graph[v] 内（该图是无向图）
- 这个图可能不是连通图，也就是说两个节点 u 和 v 之间可能不存在一条连通彼此的路径。
- 二分图 定义：如果能将一个图的节点集合分割成两个独立的子集 A 和 B ，并使图中的每一条边的两个节点一个来自 A 集合，一个来自 B 集合，就将这个图称为 二分图 。

如果图是二分图，返回 true ；否则，返回 false 。

![ 判断二分图](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/106.jpg)

```java
class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] colors = new int[n];
        Arrays.fill(colors, -1);
        for (int i = 0; i < n; i ++) {
            if (colors[i] == -1 && !setColor(graph, colors, i, 0)) {
                return false;
            }
        }
        return true;
    }
    // 广度优先搜索 对子图着色
    boolean setColor(int[][] graph, int[] colors, int i, int color) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(i);
        colors[i] = color;
        while (!queue.isEmpty()) {
            int v = queue.poll();
            for (int next : graph[v]) {
                if (colors[next] >= 0) {
                    if (colors[next] == colors[v]) {
                        return false;
                    }
                } else {
                    queue.add(next);
                    colors[next] = 1 - colors[v];
                }
            }
        }
        return true;
    }
    // 深度优先搜索 对子图着色
    // boolean setColor(int[][] graph, int[] colors, int i, int color) {
    //     if (colors[i] >= 0) {
    //         return colors[i] == color;
    //     }
    //     colors[i] = color;
    //     for (int next : graph[i]) {
    //         if (!setColor(graph, colors, next, 1 - color)) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
}
```

### 01 矩阵

给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。

两个相邻元素间的距离为 1 。

![01 矩阵](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/107.jpg)

```java
class Solution {
    // 多源BFS 问题 新增一个超级源点S理解思想，S->V 的最短距离 -1 即为答案，遍历矩阵，将所有为0的点加入队列，
    public int[][] updateMatrix(int[][] mat) {
        int n = mat.length, m = mat[0].length;
        int[][]  dists = new int[n][m];
        Queue<int[]> queue = new LinkedList<>();
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j < m; j ++) {
                if (mat[i][j] == 0) {
                    dists[i][j] = 0;
                    queue.offer(new int[]{i, j});
                } else {
                    dists[i][j] = -1;
                }
            }
        }
        int[] dx = {0, 1, -1, 0}, dy = {1, 0, 0, -1};
        while (!queue.isEmpty()) {
            var cur = queue.poll();
            for (int k = 0; k < 4; k ++) {
                int x = cur[0] + dx[k], y = cur[1] + dy[k];
                if (x < n && x >= 0 && y < m && y >= 0 && dists[x][y] == -1) {
                    dists[x][y] = dists[cur[0]][cur[1]] + 1;
                    queue.offer(new int[]{x, y});
                }
            }
        }
        return dists;
    }
}
```

### 单词接龙

在字典（单词列表） wordList 中，从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：

- 序列中第一个单词是 beginWord 。
- 序列中最后一个单词是 endWord 。
- 每次转换只能改变一个字母。
- 转换过程中的中间单词必须是字典 wordList 中的单词。

给定两个长度相同但内容不同的单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0。

![单词接龙](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/108.jpg)

```java
class Solution {
    /**
     * 单项广度优先搜索 
     * 为了求得两个节点之间的最短距离，常见的解法是用两个队列实现广度优先搜索
     */
    // public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    //     Queue<String> queue1 = new LinkedList<>();
    //     Queue<String> queue2 = new LinkedList<>();
    //     Set<String> notVisited = new HashSet<>(wordList);
    //     int length = 1;
    //     queue1.offer(beginWord);
    //     while(!queue1.isEmpty()) {
    //         String cur = queue1.poll();
    //         if (cur.equals(endWord)) {
    //             return length;
    //         }
    //         List<String> nexts = getNexts(cur);
    //         for (String next : nexts) {
    //             if (notVisited.contains(next)) {
    //                 queue2.offer(next);
    //                 notVisited.remove(next);
    //             }
    //         }
    //         if (queue1.isEmpty()) {
    //             length ++;
    //             queue1 = queue2;
    //             queue2 = new LinkedList<>();
    //         }
    //     }
    //     return 0;
    // }
    /**
     * 双向广度优先搜索 
     * 使用两个同时进行的广搜可以有效地减少搜索空间。一边从 beginWord 开始，另一边从 endWord 开始。
     * 可以可观地减少搜索空间大小，从而提高代码运行效率。
     */
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> notVisited = new HashSet<>(wordList);
        if (!notVisited.contains(endWord)) {
            return 0;
        }
        Set<String> set1 = new HashSet<>();
        Set<String> set2 = new HashSet<>();
        set1.add(beginWord);
        set2.add(endWord);
        int length = 2;
        notVisited.remove(endWord);
        while (!set1.isEmpty() && !set2.isEmpty()) {
            if (set1.size() > set2.size()) {
                var temp = set1;
                set1 = set2;
                set2 = temp;
            }
            Set<String> set3 = new HashSet<>();
            for (String s : set1) {
                List<String> nexts = getNexts(s);
                for (String ns : nexts) {
                    if (set2.contains(ns)) {
                        return length;
                    }
                    if (notVisited.contains(ns)) {
                        set3.add(ns);
                        notVisited.remove(ns);
                    }
                }
            }
            length ++;
            set1 = set3;
        }
        return 0;
    }
    List<String> getNexts(String word) {
        List<String> nexts = new ArrayList<>();
        char[] cs = word.toCharArray();
        for (int i = 0; i < cs.length; i ++) {
            char old = cs[i];
            for (char c = 'a'; c <= 'z'; c ++) {
                if (old != c) {
                    cs[i] = c;
                    nexts.add(new String(cs));
                }
            }
            cs[i] = old;
        }
        return nexts;
    }
}
```

### 打开转盘锁

一个密码锁由 4 个环形拨轮组成，每个拨轮都有 10 个数字： `'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'` 。每个拨轮可以自由旋转：例如把 '9' 变为 '0'，'0' 变为 '9' 。每次旋转都只能旋转一个拨轮的一位数字。

锁的初始数字为 '0000' ，一个代表四个拨轮的数字的字符串。

列表 deadends 包含了一组死亡数字，一旦拨轮的数字和列表里的任何一个元素相同，这个锁将会被永久锁定，无法再被旋转。

字符串 target 代表可以解锁的数字，请给出解锁需要的最小旋转次数，如果无论如何不能解锁，返回 -1 。

![打开转盘锁](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/109.jpg)

```java
class Solution {
    // 广度优先搜索
    // public int openLock(String[] deadends, String target) {
    //     String origin = "0000";
    //     Set<String> deads = new HashSet<>(Arrays.asList(deadends));
    //     if (deads.contains(origin)) {
    //         return -1;
    //     }
    //     Set<String> visited = new HashSet<>();
    //     Queue<String> queue1 = new LinkedList<>();
    //     Queue<String> queue2 = new LinkedList<>();
    //     queue1.offer(origin);
    //     visited.add(origin);
    //     int res = 0;
    //     while (!queue1.isEmpty()) {
    //         String cur = queue1.poll();
    //         if (cur.equals(target)) {
    //             return res;
    //         }
    //         List<String> nexts = getNexts(cur);
    //         for (String s : nexts) {
    //             if (!visited.contains(s) && !deads.contains(s)) {
    //                 visited.add(s);
    //                 queue2.offer(s);
    //             }
    //         }
    //         if (queue1.isEmpty()) {
    //             res ++;
    //             queue1 = queue2;
    //             queue2 = new LinkedList<>();
    //         }
    //     }
    //     return -1;
    // }
    // 双向广度优先搜索
    public int openLock(String[] deadends, String target) {
        Set<String> deads = new HashSet<>(Arrays.asList(deadends));
        Set<String> visited = new HashSet<>();
        String origin = "0000";
        if (origin.equals(target)) {
            return 0;
        }
        if (deads.contains(origin)) {
            return -1;
        }
        Set<String> set1 = new HashSet<>();
        Set<String> set2 = new HashSet<>();
        set1.add(origin);
        set2.add(target);
        visited.add(origin);
        int res = 1;
        while (!set1.isEmpty() && !set2.isEmpty()) {
            if (set1.size() > set2.size()) {
                var temp = set1;
                set1 = set2;
                set2 = temp;
            }
            Set<String> set3 = new HashSet<>();
            for (String s : set1) {
                List<String> nexts = getNexts(s);
                for (String ss : nexts) {
                    if (set2.contains(ss)) {
                        return res;
                    }
                    if (!visited.contains(ss) && !deads.contains(ss)) {
                        set3.add(ss);
                        visited.add(ss);
                    }
                }
            }
            res ++;
            set1 = set3;
        }
        return -1;
    }
    List<String> getNexts(String s) {
        List<String> nexts = new ArrayList<>();
        for (int i = 0; i < s.length(); i ++) {
            char old = s.charAt(i);
            StringBuilder sb = new StringBuilder(s);
            char nc = old == '0' ? '9' : (char)(old - 1);
            sb.setCharAt(i, nc);
            nexts.add(new String(sb));

            nc = old == '9' ? '0' : (char)(old + 1);
            sb.setCharAt(i, nc);
            nexts.add(new String(sb));
        }
        return nexts;
    }
}
```

### 所有可能的路径

给定一个有 n 个节点的有向无环图，用二维数组 graph 表示，请找到所有从 0 到 n-1 的路径并输出（不要求按顺序）。

graph 的第 i 个数组中的单元都表示有向图中 i 号节点所能到达的下一些结点（译者注：有向图是有方向的，即规定了 a→b 你就不能从 b→a ），若为空，就是没有下一个节点了。

![所有可能的路径](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/110.jpg)

```java
class Solution {
    public List<List<Integer>> allPathsSourceTarget(int[][] graph) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        dfs(graph, res, path, 0);
        return res;
    }
    void dfs(int[][] graph, List<List<Integer>> res, List<Integer> path, int u) {
        path.add(u);
        if (u == graph.length - 1) {
            res.add(new ArrayList<>(path));
        } else {
            for (int next : graph[u]) {
                dfs(graph, res, path, next);
            }
        }
        path.remove(path.size() - 1);
    }
}
```

### 除法求值

给定一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 `equations[i] = [Ai, Bi]` 和 values[i] 共同表示等式 `Ai / Bi = values[i]` 。每个 Ai 或 Bi 是一个表示单个变量的字符串。

另有一些以数组 queries 表示的问题，其中 `queries[j] = [Cj, Dj]` 表示第 j 个问题，请你根据已知条件找出 `Cj / Dj = ?` 的结果作为答案。

返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。

> 注意：输入总是有效的。可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

![除法求值](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/111.jpg)

```java
class Solution {
    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        Map<String, Set<Pair>> g = build(equations, values);
        double[] ans = new double[queries.size()];
        for (int i = 0; i < queries.size(); i ++) {
            String a = queries.get(i).get(0), b = queries.get(i).get(1);
            double x = -1.0;
            if (g.containsKey(a) && g.containsKey(b)) {
                Set<String> visited = new HashSet<>();
                x = dfs(g, a, b, visited);
            }
            ans[i] = x;
        }
        return ans;
    }

    double dfs(Map<String, Set<Pair>> g, String a, String b, Set<String> visited) {
        if (a.equals(b)) {
            return 1.0;
        }
        visited.add(a);
        for (Pair pair : g.get(a)) {
            String next = pair.k;
            if (!visited.contains(next)) {
                visited.add(next);
                double nv = dfs(g, next, b, visited);
                if (nv > 0) {
                    return pair.v * nv;
                }
            }
        }
        visited.remove(a);
        return -1.0;
    }

    Map<String, Set<Pair>> build(List<List<String>> equations, double[] values) {
        Map<String, Set<Pair>> g = new HashMap<>();
        for (int i = 0; i < equations.size(); i ++) {
            String a = equations.get(i).get(0);
            String b = equations.get(i).get(1);
            g.putIfAbsent(a, new HashSet<>());
            g.get(a).add(new Pair(b, values[i]));
            g.putIfAbsent(b, new HashSet<>());
            g.get(b).add(new Pair(a, 1.0 / values[i]));
        }
        return g;
    }
    class Pair {
        String k;
        Double v;
        public Pair (String k, Double v) {
            this.k = k;
            this.v = v;
        }
    }
}
```

### 矩阵中的最长递增路径

给定一个 m x n 整数矩阵 matrix ，找出其中 最长递增路径 的长度。

对于每个单元格，你可以往上，下，左，右四个方向移动。 不能 在 对角线 方向上移动或移动到 边界外（即不允许环绕）。

![矩阵中的最长递增路径](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/112.jpg)

```java
class Solution {
    public int longestIncreasingPath(int[][] matrix) {
        int n = matrix.length, m = matrix[0].length;
        int[][] f = new int[n][m];
        int ans = 0;
        for (int i = 0; i < n; i ++) {
            for (int j = 0; j < m; j ++) {
                ans = Math.max(ans, dfs(matrix, f, i, j));
            }
        }
        return ans;
    }
    int dfs(int[][] matrix, int[][] f, int i, int j) {
        int n = matrix.length, m = matrix[0].length;
        int v = f[i][j];
        if (v != 0) {
            return v;
        }
        v = 1;
        int[] dx = new int[]{0, 1, -1, 0}, dy = new int[]{1, 0, 0, -1};
        for (int k = 0; k < 4; k ++) {
            int x = i + dx[k], y = j + dy[k];
            if (x >= 0 && x < n && y >= 0 && y < m && matrix[x][y] > matrix[i][j]) {
                v = Math.max(v, dfs(matrix, f, x, y) + 1);
            }
        }
        f[i][j] = v;
        return v;
    }
}
```

### 课程表 II

现在总共有 numCourses 门课需要选，记为 0 到 `numCourses-1`。

给定一个数组 `prerequisites` ，它的每一个元素 `prerequisites[i]` 表示两门课程之间的先修顺序。 例如 `prerequisites[i] = [ai, bi]` 表示想要学习课程 ai ，需要先完成课程 bi 。

请根据给出的总课程数  numCourses 和表示先修顺序的 prerequisites 得出一个可行的修课序列。

可能会有多个正确的顺序，只要任意返回一种就可以了。如果不可能完成所有课程，返回一个空数组。

![课程表 II](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/113.jpg)

```java
class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        Map<Integer, List<Integer>> map = new HashMap<>();
        for (int i = 0; i < numCourses; i ++) {
            map.put(i, new ArrayList<>());
        }
        int[] degrees = new int[numCourses];
        for (int[] e : prerequisites) {
            int a = e[0], b = e[1];
            map.get(b).add(a);
            degrees[a] ++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i ++) {
            if (degrees[i] == 0) {
                queue.offer(i);
            }
        }
        List<Integer> res = new ArrayList<>();
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            res.add(cur);
            for (int next : map.get(cur)) {
                degrees[next] --;
                if (degrees[next] == 0) {
                    queue.offer(next);
                }
            }
        }
        return res.size() == numCourses ? res.stream().mapToInt(i->i).toArray() : new int[0];
    }
}
```

### 火星词典

现有一种使用英语字母的外星文语言，这门语言的字母顺序与英语顺序不同。

给定一个字符串列表 words ，作为这门语言的词典，words 中的字符串已经 按这门新语言的字母顺序进行了排序 。

请你根据该词典还原出此语言中已知的字母顺序，并 按字母递增顺序 排列。若不存在合法字母顺序，返回 "" 。若存在多种可能的合法字母顺序，返回其中 任意一种 顺序即可。

字符串 s 字典顺序小于 字符串 t 有两种情况：

- 在第一个不同字母处，如果 s 中的字母在这门外星语言的字母顺序中位于 t 中字母之前，那么 s 的字典顺序小于 t 。
- 如果前面 `min(s.length, t.length) `字母都相同，那么 `s.length < t.length `时，s 的字典顺序也小于 t 。
 
![火星词典](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/114.jpg)

```java
class Solution {
    public String alienOrder(String[] words) {
        int n = words.length;
        Map<Character, Set<Character>> g = new HashMap<>();
        Map<Character, Integer> d = new HashMap<>();
        for (String word : words) {
            for (char c : word.toCharArray()) {
                g.putIfAbsent(c, new HashSet<>());
                d.putIfAbsent(c, 0);
            }
        }
        for (int i = 1; i < n; i ++) {
            String w1 = words[i - 1];
            String w2 = words[i];
            if (w1.startsWith(w2) && !w1.equals(w2)) {
                return "";
            }
            for (int j = 0; j < w1.length() && j < w2.length(); j ++) {
                char c1 = w1.charAt(j);
                char c2 = w2.charAt(j);
                if (c1 != c2) {
                    if (!g.get(c1).contains(c2)) {
                        g.get(c1).add(c2);
                        d.put(c2, d.get(c2) + 1);
                    }
                    break;
                }
            }
        }
        Queue<Character> queue = new LinkedList<>();
        for (char c : d.keySet()) {
            if (d.get(c) == 0) {
                queue.offer(c);
            }
        }
        StringBuilder sb = new StringBuilder();
        while (!queue.isEmpty()) {
            char cur = queue.poll();
            sb.append(cur);
            for (char next : g.get(cur)) {
                int deg = d.get(next) - 1;
                if (deg == 0) {
                    queue.offer(next);
                }
                d.put(next, deg);
            }
        }
        return sb.length() == g.size() ? sb.toString() : "";
    }
}
```

### 序列重建

给定一个长度为 n 的整数数组 nums ，其中 nums 是范围为 [1，n] 的整数的排列。还提供了一个 2D 整数数组 sequences ，其中 `sequences[i] 是 nums `的子序列。
检查 nums 是否是唯一的最短 超序列 。最短 超序列 是 长度最短 的序列，并且所有序列 sequences[i] 都是它的子序列。对于给定的数组 sequences ，可能存在多个有效的 超序列 。

例如，对于 `sequences = [[1,2],[1,3]] `，有两个最短的 超序列 ，`[1,2,3] 和 [1,3,2]` 。
而对于 `sequences = [[1,2],[1,3],[1,2,3]]` ，唯一可能的最短 超序列 是 `[1,2,3] 。[1,2,3,4]` 是可能的超序列，但不是最短的。
如果 nums 是序列的唯一最短 超序列 ，则返回 true ，否则返回 false 。
子序列 是一个可以通过从另一个序列中删除一些元素或不删除任何元素，而不改变其余元素的顺序的序列。

![序列重建](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/115.jpg)

```java
class Solution {
    public boolean sequenceReconstruction(int[] nums, int[][] sequences) {
        int n = nums.length;
        Set<Integer>[] g = new Set[n + 1];
        int[] d = new int[n + 1];
        for (int i = 1; i <= n; i ++) {
            g[i] = new HashSet<>();
        }
        for (int[] seq : sequences) {
            for (int i = 0; i < seq.length - 1; i ++) {
                int a = seq[i], b = seq[i + 1];
                if (!g[a].contains(b)) {
                    g[a].add(b);
                    d[b] ++;
                }
            }
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 1; i <= n; i ++) {
            if (d[i] == 0) {
                queue.offer(i);
            }
        }
        List<Integer> built = new ArrayList<>();
        // 判断拓扑排序序列是否唯一：每次入度为 0的只有一个
        while (queue.size() == 1) {
            int cur = queue.poll();
            built.add(cur);
            for (int x : g[cur]) {
                d[x] --;
                if (d[x] == 0) {
                    queue.offer(x);
                }
            }
        }
        int[] res = new int[built.size()];
        res = built.stream().mapToInt(i->i).toArray();
        return Arrays.equals(res, nums);
    }
}
```

### 省份数量

有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 `isConnected[i][j] = 1` 表示第 i 个城市和第 j 个城市直接相连，而 `isConnected[i][j] = 0` 表示二者不直接相连。

返回矩阵中 省份 的数量。

![省份数量](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/116.jpg)

**图搜索**

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int ans = 0;
        boolean[] visted = new boolean[isConnected.length];
        for (int i = 0; i < isConnected.length; i ++) {
            if (!visted[i]) {
                ans ++;
                findCircle(isConnected, visted, i);
            }
        }
        return ans;
    }
    // 深度优先搜索 O(n^2)
    void findCircle(int[][] isConnected, boolean[] visted, int u) {
        if (visted[u]) {
            return;
        }
        visted[u] = true;
        for (int i = 0; i < isConnected.length; i ++) {
            if (isConnected[u][i] == 1) {
                findCircle(isConnected, visted, i);
            }
        }
    }
    
    // 广度优先搜索 O(n^2)
    // void findCircle(int[][] isConnected, boolean[] visted, int u) {
    //     Queue<Integer> queue = new LinkedList<>();
    //     queue.offer(u);
    //     visted[u] = true;
    //     while (!queue.isEmpty()) {
    //         int cur = queue.poll();
    //         for (int i = 0; i < isConnected.length; i ++) {
    //             if (isConnected[cur][i] == 1 && !visted[i]) {
    //                 queue.offer(i);
    //                 visted[i] = true;
    //             }
    //         }
    //     }
    // }
}
```

**并查集**

```java
class Solution {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        int[] f = new int[n];
        for (int i = 0; i < n; i ++) {
            f[i] = i;
        }
        int res = n;
        for (int i = 0; i < n; i ++) {
            for (int j = i + 1; j < n; j ++) {
                if (isConnected[i][j] == 1 && union(f, i, j)) {
                    res --;
                }
            }
        }
        return res;
    }
    int findFather(int[] f, int i) {
        if (f[i] != i) {
            return findFather(f, f[i]);
        }
        return f[i];
    }
    boolean union (int[] f, int i, int j) {
        int fi = findFather(f, i);
        int fj = findFather(f, j);
        if (fi != fj) {
            f[fi] = fj;
            return true;
        }
        return false;
    }
}
```


### 相似字符串组

如果交换字符串 X 中的两个不同位置的字母，使得它和字符串 Y 相等，那么称 X 和 Y 两个字符串相似。如果这两个字符串本身是相等的，那它们也是相似的。

例如，`"tars" 和 "rats"` 是相似的 (交换 0 与 2 的位置)； `"rats" 和 "arts" `也是相似的，但是 `"star" 不与 "tars"，"rats"，或 "arts"` 相似。

总之，它们通过相似性形成了两个关联组：`{"tars", "rats", "arts"} 和 {"star"}`。注意，`"tars" 和 "arts"` 是在同一组中，即使它们并不相似。形式上，对每个组而言，要确定一个单词在组中，只需要这个词和该组中至少一个单词相似。

给定一个字符串列表 strs。列表中的每个字符串都是 strs 中其它所有字符串的一个 字母异位词 。请问 strs 中有多少个相似字符串组？

字母异位词（anagram），一种把某个字符串的字母的位置（顺序）加以改换所形成的新词。

![相似字符串组](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/117.jpg)

```java
class Solution {
    int[] p;
    public int numSimilarGroups(String[] strs) {
        int n = strs.length;
        p = new int[n];
        for (int i = 0; i < n; i ++) {
            p[i] = i;
        }
        int res = n;
        for (int i = 0; i < n; i ++) {
            for (int j = i + 1; j < n; j ++) {
                if (check(strs[i], strs[j]) && union(i, j)) {
                    res --;
                }
            }
        }
        return res;
    }
    boolean check(String s1, String s2) {
        int cnt = 0;
        for (int i = 0; i < s1.length(); i ++) {
            if (s1.charAt(i) != s2.charAt(i)) {
                cnt ++;
            }
        }
        return cnt <= 2;
    }
    // boolean check(String s1, String s2) {
    //     if (s1.equals(s2)) {
    //         return true;
    //     }
    //     List<Integer> cnt = new ArrayList<>();
    //     for (int i = 0; i < s1.length(); i ++) {
    //         if (s1.charAt(i) != s2.charAt(i)) {
    //             cnt.add(i);
    //         }
    //     }
    //     if (cnt.size() != 2) {
    //         return false;
    //     }
    //     int a = cnt.get(0), b = cnt.get(1);
    //     return s1.charAt(a) == s2.charAt(b) && s1.charAt(b) == s2.charAt(a);
    // }
    boolean union(int i, int j) {
        int pi = find(i);
        int pj = find(j);
        if (pi != pj) {
            p[pi] = pj;
            return true;
        }
        return false;
    }
    int find(int i) {
        if (p[i] != i) {
            return find(p[i]);
        }
        return i;
    }
}
```

### 冗余连接

树可以看成是一个连通且 无环 的 无向 图。

给定往一棵 n 个节点 (节点值 1～n) 的树中添加一条边后的图。添加的边的两个顶点包含在 1 到 n 中间，且这条附加的边不属于树中已存在的边。图的信息记录于长度为 n 的二维数组 `edges ，edges[i] = [ai, bi]` 表示图中在 ai 和 bi 之间存在一条边。

请找出一条可以删去的边，删除后可使得剩余部分是一个有着 n 个节点的树。如果有多个答案，则返回数组 edges 中最后出现的边。

![冗余连接](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/118.jpg)

```java
class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] f = new int[n + 1];
        for (int i = 1; i <= n; i ++) {
            f[i] = i;
        }
        for (int[] e : edges) {
            if (!union(f, e[0], e[1])) {
                return e;
            }
        }
        return new int[2];
    }
    boolean union(int[] f, int i, int j) {
        int fi = findF(f, i);
        int fj = findF(f, j);
        if (fi != fj) {
            f[fi] = fj;
            return true;
        }
        return false;
    }
    int findF(int[] f, int i) {
        if (f[i] != i) {
            return findF(f, f[i]);
        }
        return f[i];
    }
}
```

### 最长连续序列

给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

![最长连续序列](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/剑指offer2/119.jpg)

```java
class Solution {
    public int longestConsecutive(int[] nums) {
        // 并查集 O(n)


        // 排序 双指针 O(nlogn)
        // if (nums.length == 0) {
        //     return 0;
        // }
        // Arrays.sort(nums);
        // int ans = 0, cnt = 1;
        // for (int i = 1; i < nums.length; i ++) {
        //     if (nums[i] == nums[i - 1]) continue;
        //     if (nums[i] == nums[i - 1] + 1) {
        //         cnt ++;
        //     } else {
        //         ans = Math.max(ans, cnt);
        //         cnt = 1;
        //     }
        // }
        // ans = Math.max(ans, cnt);
        // return ans;

        // 哈希 O(n)
        // Set<Integer> set = new HashSet<>();
        // for (int x : nums) {
        //     set.add(x);
        // }
        // int ans = 0;
        // for (int x : set) {
        //     if (!set.contains(x - 1)) {
        //         int u = x + 1;
        //         while (set.contains(u)) {
        //             u ++;
        //         }
        //         ans = Math.max(ans, u - x);
        //     }
        // }
        // return ans;
    }
}
```











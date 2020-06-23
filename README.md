### 虚拟dom的结构


### DOM-DIFF
比较两个虚拟dom对象的区别
根据变更创建出补丁patch
根据补丁patch再更新DOM

### 三种优化规则
更新时只比较同级
不跨级
同层变化可以复用（key来实现）


### 先序深度优先遍历
不是层次遍历！！！！




文章参考：
https://www.jianshu.com/p/98ea87eed412
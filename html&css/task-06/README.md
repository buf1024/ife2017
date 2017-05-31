[任务六：通过HTML及CSS模拟报纸排版](http://ife.baidu.com/course/detail/id/99)

#注意点#

1. 首字母大小:first-letter, 包括我们今天所说的rem。在W3C官网上是这样描述rem的——“font size of the root element” 。
2. div overflow:auto/hidden;的使用
3. 图片透明度opacity: 0.5
4. body 下面加div元素 margin: 0px auto实现居中对齐。
5. float布局，放html结构前面
6. font-variant: small-caps; /*关键属性，解决首字变大后，下划线变粗问题*/
   text-transform: capitalize; /*关键属性，解决首字变大后，下划线变粗问题*/
7. 少用表格等布局，表现尽量用css实现
8. 在图片所在的div前面增加一个宽度为1px的空div，使空div和图片所在的div都向左/右浮动，再清除图片所在的div受左/右浮动的影响。这样，空div 会把图片挤下去。修改空div的高度，可以调整图片的位置。

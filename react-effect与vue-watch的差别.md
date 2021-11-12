# vue的渲染方式
render函数在执行的时候会被响应式数据**收集依赖**，当数据发生改变时触发dep数组内的订阅者，其中就有render函数，生成新的vnode与旧的对比。进行数据更新
watch函数也在dep之中,随着页面更新前后一同触发
# react的渲染方式
render函数不会收集依赖,通过**setData**触发render和effect函数。effect会先执行销毁函数清楚之前的状态再执行一遍effect函数。**每次更新时都会运行Effect**就算Effect不使用任何state。
    相当于vue中的"**("*".watch)**",任何state发生改变都会触发

# 总结
vue.watch更加直观好用,可以挂载在state中
前期的react,当state数据改变只能通过**componentDidUpdate**在页面渲染之后进行函数操作，所有的函数耦合在一块了
watch：当state发生改变后触发
Effect：当页面渲染之后触发，第二个参数用于选择可以触发的state
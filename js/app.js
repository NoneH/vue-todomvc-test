	let vm = new Vue({
        el: "#app",
        data() {
            return {
                todoLists: [],
                dataStatus: ["All", "Active", "Completed"],
                dataStatusIndex: 0,
                whichShow: true,
                defaultShow: true
            }
        },
        computed: {
            times() { //使用计算属性计算待办todos的次数
                let todoArr = this.todoLists
                let times = 0;
                for (let i = 0; i < todoArr.length; i++) {
                    if (todoArr[i].isChecked === false) {
                        times++
                    }
                }
                return times
            }
        },
        methods: {
            toEdit(obj) { //使添加的todo可编辑
                obj.isEditing = true
            },
            unEdit(obj) { //使添加的todo不可编辑
                obj.isEditing = false
            },
            addTodo(e) { //添加todo
                var val = e.value;
                if (val === "") {
                    return
                } //如果输入内容为空则立即返回
                this.todoLists = this.todoLists.concat({ //使用concat这个api添加todo
                    value: val, //输入内容
                    isEditing: false, //是否在编辑状态
                    isActive: false, //删除X图标是否激活
                    isChecked: false //是否已完成
                });
                this.$refs.currentInput.value = "" //按下enter添加todo之后把输入框value清零
                window.localStorage.setItem("content", JSON.stringify(this.todoLists)) //使用localStorage以JSON格式存储数据
            },
            deleteTodo(index) { //删除todo
                this.todoLists.splice(index, 1);
                window.localStorage.setItem("content", JSON.stringify(this.todoLists)) //以json格式存储数据
            },
            switchStatus(index) { //试下下方三个状态切换，略麻烦
                this.dataStatusIndex = index;
                if (this.dataStatus[index] === "Active") {
                    this.defaultShow = false;
                    this.whichShow = false
                } else if (this.dataStatus[index] === "Completed") {
                    this.defaultShow = false;
                    this.whichShow = true
                } else if (this.dataStatus[index] === "All") {
                    this.defaultShow = true
                }
            },
            clearTodos() { //清空已完成的todoLists
                this.todoLists = this.todoLists.filter(todo => todo.isChecked === false)
                window.localStorage.setItem("content", JSON.stringify(this.todoLists)) //以json格式存储数据
            },
            selectAllTodos() { //设置所有todo为已完成
                this.todoLists.map(todo => todo.isChecked = todo.isChecked ? false : true)
            }
        },
        directives: { //自定义focus指令
            "todo-focus": function (el, binding) {
                if (binding.value) {
                    el.focus()
                }
            }
        },
        created() {
            let myStorage = window.localStorage.getItem('content');
            this.todoLists = JSON.parse(myStorage) || [] //因为todoLists初始值是null,使用或运算符，如果为null设为空数组
        }
    });


var color = ['blue', 'red', 'orange', 'green', 'yellow'];
localStorage.id = localStorage.id ? localStorage.id : 1;
var app = new Vue({
    el: '#el',
    data: {
        notes: [
            {
                id: localStorage.id,
                title: '便签1',
                content: '',
                top: 10,
                left: 120,
                theme: color[Math.floor(Math.random() * 5)]
            }
        ],
        blockData: {
            state: false,
            index: null,
            position: {}
        }
    },
    methods: {
        addNote: function (e) {
            localStorage.id++;
            var top = e.clientY - 75;
            left = e.clientX - 120;
            id = localStorage.id;
            title = '便签' + localStorage.id;
            content = '';
            theme = color[Math.floor(Math.random() * 5)];
            note = {id, title, content, top, left, theme};
            this.notes.push(note);
            this.save();
        },
        blockDelete: function (i) {
            this.notes.splice(i, 1);
            this.save();
            this.blockData.index = null;
        },
        md: function (i, e) {
            this.blockData.state = true;
            this.blockData.index = i;
            this.blockData.position = {
                x: e.offsetX,
                y: e.offsetY
            };
        },
        mu: function () {
            this.blockData.state = false;
        },
        blockMove: function (e) {
            if (this.blockData.state) {
                var top = e.clientY - 50 - this.blockData.position.y;
                var left = e.clientX - this.blockData.position.x;
                this.notes[this.blockData.index].top = top;
                this.notes[this.blockData.index].left = left;
                this.save();
            }
        },
        save: function () {
            localStorage.notes = JSON.stringify(this.notes);
        },
        init: function () {
            localStorage.clear();
            location.reload();
        },
        textArea: function (i) {
            this.blockData.index=this.blockData.index==i?i:null;
        }
    },
    mounted: function () {
        document.onkeyup = (function (e) {
            if ((e.keyCode == 8 || e.keyCode == 46) && this.blockData.index != null) {
                this.notes.splice(this.blockData.index, 1);
                this.save();
                this.blockData.index = null;
            }
        }).bind(this);
        //bind之前this指document
        if (localStorage.notes) {
            this.notes = JSON.parse(localStorage.notes);
        }
    }
});
class LinkedList
{
    data;
    next;
    constructor(data) 
    {
        this.data=data
        this.next=null
    }
}
let new_data = (value, node) => {
    const newone = new LinkedList(value)
    if (node == null) {
        return newone;
    }
    newone.next = node
    node = newone
    return node;
}
let exist_node_shift = (node, value) => {
    c = node;
    p = null;
    while (c !== null) {
        if (c.data[0] == value[0]) {
            break;
        }
        p = c;
        c = c.next;
    }
    if (c == null) {
        return -1;
    }
    if (p == null) {
        node.data[1] = value[1]
        return 0;
    }
    p.next = c.next;
    return 1;
}
let front_deletion = (node) => {
    if (node.next == null) {
        node = null;
        return null;
    }
    let t = node.next
    node = t;
    return node;
}
let LRU_deletion = (node) => {
    c = node
    while (c.next.next != null) {
        c = c.next;
    }
    c.next = null;
    return node
}
let count = 3;
let chatbox = document.querySelector("#chatbox")
let traverse = (node) => {
    let d = node
    chatbox.innerHTML = ``
    while (d != null) {
        let content = document.createElement("div")
        content.innerHTML = `<h1>${d.data[0]}</h1>
            <div class="px-4 py-4">
                <p class="text-gray-900">
                    ${d.data[1]}
                </p>
            </div>`
        chatbox.appendChild(content)
        d = d.next
    }
}
let Chatnode = new LinkedList(["Priyam", "Hi!Whassup?"]);
Chatnode = new_data(["Aman", "Bhai!"], Chatnode)
Chatnode = new_data(["Anupam", "Bhai Pranam!"], Chatnode)
traverse(Chatnode)

document.querySelector("#send").addEventListener("click", () => {
    let name = document.getElementById("contactlist").value
    let message = document.querySelector("input").value
    if (message) {
        if (count == 5) {
            let indicator = exist_node_shift(Chatnode, [name, message]);
            if (indicator == -1) {
                Chatnode = LRU_deletion(Chatnode)
                console.log(Chatnode)
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else if (indicator == 1) {
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else {
                traverse(Chatnode)
            }
        }
        else {
            let indicator = exist_node_shift(Chatnode, [name, message]);
            if (indicator == -1) {
                count += 1;
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else if (indicator == 1) {
                Chatnode = new_data([name, message], Chatnode)
                traverse(Chatnode)
            }
            else {
                traverse(Chatnode)
            }
        }
    }
})
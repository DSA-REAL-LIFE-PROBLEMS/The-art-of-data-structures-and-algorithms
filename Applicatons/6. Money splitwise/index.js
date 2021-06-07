class Heap
{
    constructor()
    {
        this.heap=[]
    }
    isEmpty = () =>
    {
        return this.heap.length===0
    }
    add_new_element = (num) =>
    {                                                                                                   
        this.heap.push(num)
        let index = this.heap.length-1;
        while(index>0)
        {
            let parentIndex = Math.floor((index-1)/2)
            let t1 = this.heap[parentIndex]
            let t2 = this.heap[index]
            if(t1[0]>=t2[0])
            {
                break;
            }
            this.heap[index] = t1
            this.heap[parentIndex] = t2
            index = parentIndex
        }
    }
    max_pop = () => {
        let top = this.heap[0];
        let tmp = this.heap.pop();
        if(!this.isEmpty())
        {            
            this.heap[0]=tmp;
            this.sinkdown(0)
        }        
        return top
    }
    sinkdown = (index) =>
    {
        let left =2*index+1;
        let right = 2*index+2;
        let large = index
        if(left<this.heap.length && this.heap[left][0]>this.heap[large][0])
        {
            large=left
        }
        if(right<this.heap.length && this.heap[right][0]>this.heap[large][0])
        {
            large=right
        }
        if(large!==index)
        {
            let t = this.heap[index]
            this.heap[index] = this.heap[large]
            this.heap[large] = t
            this.sinkdown(large)
        }
    }
}
onload = function () {
    
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const genNew = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');
    const reset = document.getElementById('reset')
    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: 'FontAwesome',
                code: '\uf183',
                size: 50,
                color: '#991133',
            }
        }
    };
    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);
    var persons = [];
    var list_of_persons = [];
    var edge = [];
    
    function createData(){
        first_person =  document.querySelector("#first").value
        second_person = document.querySelector("#second").value
        amount = document.querySelector("#amount").value
        if(first_person==="" || second_person === "" || amount=== "" || 
        isNaN(parseInt(first_person)) || isNaN(parseInt(second_person)) || isNaN(parseInt(amount)))
        {
            return;
        }
        if(!list_of_persons.includes(first_person))
        {
            persons.push({id:first_person, label:"Person " + first_person})
            list_of_persons.push(first_person)
        }
        if(!list_of_persons.includes(second_person))
        {
            persons.push({id:second_person, label:"Person " + second_person})
            list_of_persons.push(second_person)            
        }
        list_of_persons.sort()
        var n = list_of_persons[list_of_persons.length-1]
        for(var i=1;i<=n;i++)
        {
            if(!list_of_persons.includes(i))
            {
                list_of_persons.push(i);
                persons.push({id:i, label:"Person " + i})
            }
        }
        list_of_persons.sort()
        edge.push({from: parseInt(first_person), to: parseInt(second_person), label: amount})    
        document.querySelector("#first").value = ""
        document.querySelector("#second").value = ""
        document.querySelector("#amount").value = ""
    }

    genNew.onclick = function () {
        createData()
        var node = new vis.DataSet(persons);
        curr_data = {nodes:node,edges:edge};
        network.setData(curr_data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function () {
        temptext.style.display  = "none";
        container2.style.display = "inline";
        const solvedData = solveFinal();
        network2.setData(solvedData);
    };
    reset.onclick = function()
    {
        persons = [];
        list_of_persons = [];
        edge = [];
        k = 1;
        document.querySelector("#first").value = ""
        document.querySelector("#second").value = ""
        document.querySelector("#amount").value = ""
        node = new vis.DataSet(persons);
        data = {nodes:node,edges:edge}
        network.setData(data);
        temptext.style.display = "none"
        container2.style.display = "none";
    }

solveFinal = () => {
    let data = curr_data
    let datalen = data['nodes'].length
    let values = Array(datalen).fill(0)
    for(let i=0;i<data['edges'].length;i++)
    {
        const edge = data['edges'][i]
        values[edge['to']-1]+=parseInt(edge['label'])
        values[edge['from']-1]-=parseInt(edge['label'])
    }
    let pos_heap = new Heap();
    let neg_heap = new Heap();
    for(let i=0;i<datalen;i++)
    {
        if(values[i]>0)
        {
            pos_heap.add_new_element([values[i],i])
        }
        else
        {
            neg_heap.add_new_element([-values[i],i])
            values[i]*= -1
        }
    }
    let new_heap=[]
    while(!pos_heap.isEmpty() && !neg_heap.isEmpty())
    {
        let mx = pos_heap.max_pop()
        let mn = neg_heap.max_pop()

        let dif = Math.min(mx[0],mn[0])
        new_heap.push({from:mn[1]+1,to:mx[1]+1,label:String(Math.abs(dif))})
        values[mx[1]] -= dif
        values[mn[1]] -= dif
        if(mx[0]>mn[0])
        {
            pos_heap.add_new_element([values[mx[1]],mx[1]])
        }
        else if(mx[0]<mn[0])
        {
            neg_heap.add_new_element([values[mn[1]],mn[1]])
        }
    }
    data = {
        nodes:data['nodes'],
        edges:new_heap,
    }
    return data
}
}
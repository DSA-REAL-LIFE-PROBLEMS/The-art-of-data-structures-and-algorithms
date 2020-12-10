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
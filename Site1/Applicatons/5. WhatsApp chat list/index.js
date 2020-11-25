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
    let new_data = (value,node) => {
        const newone = new LinkedList(value)
        if(node==null)
        {
            return newone;
        }
        newone.next = node
        node=newone
        return node;
    }
    let exist_node_shift = (node,value) => {
          c = node;
          p=null;
          while(c!==null)
          {
              if(c.data[0]==value[0])
              {
                  break;
              }
              p=c;
              c=c.next;
          }
          if(c==null)
          {
              return -1;
          }
          if(p==null)
          {
              node.data[1] = value[1]
              return 0;
          }
          p.next=c.next;
          return 1;
    }
    let front_deletion = (node) => {
        if(node.next==null)
        {
            node=null;
            return null;
        }
        let t = node.next
        node=t;
        return node;
    }
    let LRU_deletion = (node) => {
        c=node
        while(c.next.next!=null)
        {
            c=c.next;
        }
        c.next=null;
        return node
    }

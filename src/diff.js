/**
 * 比较老树与新树的区别
 * @param {*} oldTree 
 * @param {*} newTree 
 * 规则：
 * 1. 结点类型type相同时，去看一下props是否相同。产生一个属性补丁包{ type:'ATTRS',attrs:{ class: 'list-group'}}
 * 2. 新dom结点不存在的情况，   { type:' REMOVE', index:xxx }
 * 3. 结点类型不相同，直接替换, { type:'REPLACE', newNode: newNode}
 * 4. 文本的变化，            { type:'TEXT', text: 1}
 */
function diff(oldTree, newTree){
     //补丁包就是一个对象

     let patches = {};
     let index = 0;

     
     walk(oldTree, newTree, index, patches);
     
     return patches;
}

/**
 * 递归树，比较后的结果放到补丁包中
 * 
 */
const ATTRS = 'ATTRS'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
function walk(oldNode, newNode, index, patches){
    //每个元素都有的补丁对象
    let currentPatch = [];
    //规则2:如果新结点不存在
    if(!newNode){
        currentPatch.push({type: REMOVE, index})
    }else 
    //规则4：判断是不是文本
    if(diffTools.isString(oldNode) && diffTools.isString(newNode)){
        if(oldNode !== newNode){
            currentPatch.push({type: TEXT, text: newNode})
        }
        
    }else 
    //规则1：两结点类型相同，则比较属性
    if(oldNode.type === newNode.type){
        //比较属性是否更新
        let attrs = diffTools.attrs(oldNode.props, newNode.props);
        if(Object.keys(attrs).length> 0){
            currentPatch.push({type: ATTRS, attrs})
        }
        //如果有子节点，则遍历子节点
        diffTools.child(oldNode.children, newNode.children, index, patches);


    }else { //规则4：结点类型不同，也就是被替换了
        
        currentPatch.push({type:REPLACE, newNode})

    }
    //TODO 如果平级元素互换，会导致重新渲染，其实移动一下就可以
    //TODO 新增节点也不会被更新
    
    if(currentPatch.length){//补丁中有内容，则
        patches[index] = currentPatch;
    }
    

}
/**
 * 维护全局的Index
 *  
 */
let Index = 0;

/**
 * 
 */
let diffTools = {
    attrs(oldAttrs, newAttrs){
        let patch = {};

        for(let key in oldAttrs){
            if(oldAttrs[key] !== newAttrs[key]){
                patch[key] = newAttrs[key]; //有可能新的里面删掉了，就undefined
            }
        }
        for(let key in newAttrs){
            //新节点追加的属性
            if(!oldAttrs.hasOwnProperty(key)){
                patch[key] = newAttrs[key];
            }
        }
        return patch;
    },
    child(oldChild, newChild, index, patches){
        //比较旧的和新的第一个
        oldChild.forEach((child, idx) => {
            //索引 不应该是index,应该是key属性？？？
            //index会递增的
            walk(child, newChild[idx], ++Index, patches)
        });
    },
    isString(node){
        return Object.prototype.toString.call(node) === '[object String]';
    }
}

export default diff
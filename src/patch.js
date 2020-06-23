import { renderDOM, render, Element, setAttr } from "./element";

/**
 * 打补丁
 */
let allPatches;
let index = 0; //默认要打补丁的索引

function patch(node, patches){
    //遍历并给某个元素打补丁
    allPatches = patches;
    walk(node);
}

function walk(node){
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => {
        walk(child);  
    });
    if(currentPatch){
        doPatch(node, currentPatch)
    }

}

function doPatch(node, patches){
    patches.forEach(patch =>{
        switch (patch.type) {
            case 'ATTRS':
                for(let key in patch.attrs){
                    let value = patch.attrs[key];
                    if(value){
                        setAttr(node, key, value);
                    }else {
                        node.removeAttribute(key);
                    }
                   
                }
                break;
            case 'TEXT':
                node.textContent = patch.text;
                break;
            case 'REPLACE':
                let newNode = (patch.newNode instanceof Element)?
                            render(patch.newNode): document.createTextNode(patch.newNode);
                    node.parentNode.replaceChild(newNode, node)
            case 'REMOVE':
                node.parentNode.removeChild(newNode, node);
            default:
                break;
        }
    })

}
export default patch
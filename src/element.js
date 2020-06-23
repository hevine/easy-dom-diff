class Element{
    constructor(type, props, children){
        this.type = type;
        this.props = props;
        this.children = children;


    }
}
function createElement(type, props, children){
    return new Element(type, props, children);
}

//render方法可以把vnode转化成真实dom
function render(eleObj){
    let el = document.createElement(eleObj.type);//创建一个该类型的元素
    // eleObj.type
    for(let key in eleObj.props){
        //设置属性的方法
        setAttr(el, key, eleObj.props[key]);
    }
    //遍历children子元素
    (eleObj.children||[]).forEach(child => {
       child = (child instanceof Element)?render(child):document.createTextNode(child);
       el.appendChild(child);
    });

    return el;
}

//设置属性的方法
/**
 * 
 * @param {*} node 
 * @param {*} key -value -style  -other
 * @param {*} value 
 */
function setAttr(node, key, value){
    switch (key) {
        //case1 node是一个input或者textarea
        case 'value':
            if(node.tagName.toUpperCase() == 'INPUT' || node.tagName.toUpperCase() == 'TEXTAREA'){
                node.value = value;
            }else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
        default:
            node.setAttribute(key, value);
            break;
    }
}

//渲染节点, 将虚拟dom渲染成真实DOM
function renderDOM(el, target){
    target.appendChild(el);
}


export { createElement, render, Element, renderDOM, setAttr};
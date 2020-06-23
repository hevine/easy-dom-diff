import { createElement,render, renderDOM } from './element'

import diff from './diff';
import patch from './patch';

import './style.css'
let virtualDom1 = createElement('ul', { class: 'list'}, [
    createElement('li',{class:'item'}, ['a']),
    createElement('li',{class:'item'}, ['b']),
    createElement('li',{class:'item'}, ['c'])
]);
let virtualDom2= createElement('ul', { class: 'list'}, [
    createElement('li',{class:'item'}, ['1']),
    createElement('li',{class:'item-active'}, ['b']),
    createElement('div',{class:'item-div'}, ['3']),
    
]);
let el = render(virtualDom1);
console.log(virtualDom1);
console.log(el);
let patches = diff(virtualDom1, virtualDom2);
//把补丁包给el元素打上。并重新更新视图
patch(el, patches); 
console.log('patches', patches)
renderDOM(el, window.root);
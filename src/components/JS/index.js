import Vue from 'vue'
import MessageBox from './MessageBox'

export var messageBox = (function () {
  var defaults = { // 默认值
    title: '', // 标题（城市）
    content: '', // 内容（北京）
    cancel: '', // 取消的文字
    ok: '', // 确定的文字
    handleCancel: null, // 取消的事件
    handleOk: null// 确认的事件
  }

  var MyComponent = Vue.extend(MessageBox)// Vue.extend：使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

  return function (opts) { // opts配置参数
    for (var attr in defaults) {
      defaults[attr] = opts[attr]
    }

    var vm = new MyComponent({
      el: document.createElement('div'), // 当一个vue实例有<template>时，就会把el给替换掉
      data: {
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: {
        handleCancel () {
          defaults.handleCancel && defaults.handleCancel.call(this) // bind(this)：改变this指向问题（不能用bind：因为改指向后只有再次调用才会触发）
          document.body.removeChild(vm.$el)
        },
        handleOk () {
          defaults.handleOk && defaults.handleOk.call(this)
          document.body.removeChild(vm.$el)
        }
      }
    })

    document.body.appendChild(vm.$el)
  }
})()

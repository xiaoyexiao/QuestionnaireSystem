export default {
  // 后端数据与前端数据的转化
  questionnaireToList(questionnaireData){
  let index=1,n=0,list=[],obj={'editShow':false},options=[]
  for(let i=0;i<questionnaireData.options.length;i++) {
    let item = questionnaireData.options[i]
    if (item.questionNumber === index) {
        // 第一道题的第一个选项
        obj['style'] = item.style
        obj['question'] = item.question
        obj['must'] = item.required === 1
        options[n++] = {
          value: item.text,
          label: item.text
        }
        obj['options'] = options
        if (item.style === 1) {
          obj['answer'] = ''
        } else if (item.style === 2) {
          obj['answer'] = []
        } else {
          obj['answer'] = ''
        }
    } else {//添加进数组
      let cloneObj = JSON.parse(JSON.stringify(obj));
      options = []
      obj = {'editShow': false}
      n = 0
      list[index - 1] = cloneObj
      index++
      i--
    }
  }
  let cloneObj = JSON.parse(JSON.stringify(obj))
  list[index-1]=cloneObj
  return list
}
}

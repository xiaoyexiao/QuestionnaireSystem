<template>
  <questionnaire-edit></questionnaire-edit>
</template>

<script>
import QuestionnaireEdit from "./QuestionnaireEdit";

export default {
  name: "QuestionnaireCreate",
  components:{
    QuestionnaireEdit
  },
  data(){
    return{
      headTitle:'创建新问卷'
    }
  }
}
</script>

<style scoped>

</style>

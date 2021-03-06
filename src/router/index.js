import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Index from "../components/Index";
import QuestionnaireResult from "../components/QuestionnaireResult";
import QuestionnaireFilling from "../components/QuestionnaireFilling";
import QuestionnaireEdit from "../components/QuestionnaireEdit";
import QuestionnaireCheck from "../components/QuestionnaireCheck";
import QuestionnaireCreate from "../components/QuestionnaireCreate";
import NotFound from "../components/NotFound";
import Skip from "../components/Skip";

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/main',
      name: 'Main',
      component: Index,
    },
    {
      path: '/questionnaireEdit',
      name: 'QuestionnaireEdit',
      component: QuestionnaireEdit,
    },
    {
      path: '/questionnaireFilling/:id',
      name: 'QuestionnaireFilling',
      component: QuestionnaireFilling,
    },
    {
      path: '/questionnaireResult',
      name: 'QuestionnaireResult',
      component: QuestionnaireResult,
    },
    {
      path: '/skipping',
      name: 'Skip',
      component: Skip
    },
    {
      path: '/questionnaireCheck',
      name: 'QuestionnaireCheck',
      component: QuestionnaireCheck,
    },
    {
      path: '/questionnaireCreate',
      name: 'QuestionnaireCreate',
      component: QuestionnaireCreate,
    },
    {
      path: '*',
      component: NotFound
    }
  ],
});

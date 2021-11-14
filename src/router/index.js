import Vue from 'vue'
import VueRouter from 'vue-router'

// student
const Login = () =>
    import ('../views/user/Login.vue')
const Notify = () =>
    import ('../views/student/notify/Notify.vue')
const NotifyDetail = () =>
    import ('../views/student/notify/NotifyDetail.vue')
const Employment = () =>
    import ('../views/student/employment/Employment.vue')
const CheckWork = () =>
    import ('../views/student/checkWork/CheckWork.vue')
const Policy = () =>
    import ('../views/student/policy/Policy.vue')
const StudentInfo = () =>
    import ('../views/user/StudentProfile.vue')
const Employ = () =>
    import ('../views/student/employment/Employ.vue')
const JobDetail = () =>
    import ('../views/student/employment/JobDetail.vue')
const Resign = () =>
    import ('../views/student/checkWork/Resign.vue')
const HourDetail = () =>
    import ('../views/student/checkWork/HourDetail.vue')
const Record = () =>
    import ('../views/student/checkWork/Record.vue')
const PolicyDetail = () =>
    import ('../views/student/policy/PolicyDetail.vue')

// teacher
const Message = () =>
    import ('../views/teacher/message/Message.vue')
const Publish = () =>
    import ('../views/teacher/publish/Publish.vue')
const Admission = () =>
    import ('../views/teacher/admission/Admission.vue')
const WorkHoursDetail = () =>
    import ('../views/teacher/confirm/WorkHoursDetail.vue')
const Confirm = () =>
    import ('../views/teacher/confirm/Confirm.vue')
const TeacherInfo = () =>
    import ('../views/user/TeacherProfile.vue')
const CheckDetail = () =>
    import ('../views/teacher/message/CheckDetail.vue')
const Edit = () =>
    import ('../views/teacher/publish/Edit.vue')
const Publishment = () =>
    import ('../views/teacher/publish/Publishment.vue')
const JobInfo = () =>
    import ('../views/teacher/publish/JobInfo.vue')
const StudentDetail = () =>
    import ('../views/teacher/admission/StudentDetail.vue')
const ManualDeal = () =>
    import ('../views/teacher/admission/ManualDeal.vue')
const ChangeTime = () =>
    import ('../views/teacher/confirm/ChangeTime.vue')


//新增两个页面 公告 和 政策文件
const TNotify = () =>
    import ('../views/teacher/notify/Notify.vue')
// const TNotifyDetail = () =>
//     import ('../views/teacher/notify/NotifyDetail.vue')
const TPolicy = () =>
    import ('../views/teacher/policy/Policy.vue')
// const TPolicyDetail = () =>
//     import ('../views/teacher/policy/PolicyDetail.vue')

const checkDetail = () =>
    import ('../views/teacher/message/CheckDetail.vue')

// 学生路由
export const studentRoutes = [{
        path: '/notify',
        name: 'Notify',
        component: Notify,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/notifyDetail',
        name: 'NotifyDetail',
        component: NotifyDetail,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/checkWork',
        name: 'CheckWork',
        component: CheckWork,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/record',
        name: 'Record',
        component: Record,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/employment',
        name: 'Employment',
        component: Employment,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/policy',
        name: 'Policy',
        component: Policy,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/studentInfo',
        name: 'StudentInfo',
        component: StudentInfo,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/employ/:stationId',
        name: 'Employ',
        component: Employ,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/jobDetail/:stationId',
        name: 'JobDetail',
        component: JobDetail,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/resign',
        name: 'Resign',
        component: Resign,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/hourDetail',
        name: 'HourDetail',
        component: HourDetail,
        meta: {
            role: 'student'
        }
    },
    {
        path: '/policyDetail',
        name: 'PolicyDetail',
        component: PolicyDetail,
        meta: {
            role: 'student'
        }
    }
]

//老师路由
export const teacherRoutes = [{
        path: '/message',
        name: 'Message',
        component: Message,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/publish',
        name: 'Publish',
        component: Publish,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/admission',
        name: 'Admission',
        component: Admission,
        meta: {
            role: 'teacher' 
        }
    },
    {
        path: '/workHoursDetail',
        name: 'WorkHoursDetail',
        component: WorkHoursDetail,
        meta: {
            role: 'teacher' 
        }
    },
    {
        path: '/confirm',
        name: 'Confirm',
        component: Confirm,
        meta: {
            role: 'teacher',
            keepAlive:true,
            isBack:false,
            isRefresh:true
        }
    },
    
    {
        path: '/teacherInfo',
        name: 'TeacherInfo',
        component: TeacherInfo,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/checkDetail',
        name: 'CheckDetail',
        component: CheckDetail,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/edit',
        name: 'Edit',
        component: Edit,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/publishment',
        name: 'Publishment',
        component: Publishment,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/jobInfo',
        name: 'JobInfo',
        component: JobInfo,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/studentDetail',
        name: 'StudentDetail',
        component: StudentDetail,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/manualDeal',
        name: 'ManualDeal',
        component: ManualDeal,
        meta: {
            role: 'teacher'
        }
    },
    {
        path: '/changeTime',
        name: 'ChangeTime',
        component: ChangeTime,
        meta: {
            role: 'teacher'
        }
    },
    //新增
    {
        path: '/Tnotify',
        name: 'TNotify',
        component: TNotify,
        meta: {
            role: 'teacher'
        }
    },
    // {
    //     path: '/TnotifyDetail',
    //     name: 'TNotifyDetail',
    //     component: TNotifyDetail,
    //     meta: {
    //         role: 'teacher'
    //     }
    // },
    {
        path: '/Tpolicy',
        name: 'TPolicy',
        component: TPolicy,
        meta: {
            role: 'teacher'
        }
    },
    // {
    //     path: '/TpolicyDetail',
    //     name: 'TPolicyDetail',
    //     component: TPolicyDetail,
    //     meta: {
    //         role: 'teacher'
    //     }
    // },
    {
        path: '/checkDetail',
        name: 'checkDetail',
        component: checkDetail,
        meta: {
            role: 'teacher'
        }
    },
]

const routes = [{
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        redirect: '/login'
    },
    ...teacherRoutes,
    ...studentRoutes
]

Vue.use(VueRouter)

const router = new VueRouter({ routes })

export default router
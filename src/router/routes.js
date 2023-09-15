export default [


  // EditUsers
  {
    path: '/users/1/edit',
    name: 'EditUsers',
    component: () => import('@/views/users/Edit.vue'),

    children: [
      {
        path: '',
        component:()=> import('@/views/users/Profile.vue'),
        meta : {auth: true}
      }
    ]
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },


]

export default [


  // EditUsers
  {
    path: '/users/1/edit',
    // name: 'EditUsers',
    component: () => import('@/views/users/Edit.vue'),

    children: [
      {
        path: '',
        name: 'EditUsersssssssssssssssssssssssssss',
        component: () => import('@/views/users/Profile.vue'),
        meta: { auth: true }
      },
      {
        path: '/users/1/edit_avatar',
        name: 'EditAvatar2222',
        component: () => import('@/views/users/Avatar.vue'),
        meta: { auth: true }
      },
      {
        path: '/users/1/edit_password',
        name: 'EditA222',
        component: () => import('@/views/users/Password.vue'),
        meta: { auth: true }
      }
    ]
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/:user',
    // name: 'Column',
    component: () => import('@/views/articles/Column.vue'),
    children: [
      {
        path: '',
        name: 'Column',
        component: () => import('@/views/articles/List.vue'),
        meta: { auth: true }
      }
    ]
  },


]

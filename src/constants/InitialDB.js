export default {
  path: '1',
  id: '1',
  value: 'node1',
  isDeleted: false,
  childes: [
    {
      path: '1/2',
      id: '2',
      value: 'node2',
      isDeleted: false,
      childes: []
    },
    {
      path: '1/3',
      id: '3',
      value: 'node3',
      isDeleted: false,
      childes: [
        {
          path: '1/3/4',
          id: '4',
          value: 'node4',
          isDeleted: false,
          childes: [],
        },
      ]
    },
    {
      path: '1/5',
      id: '5',
      value: 'node5',
      isDeleted: false,
      childes: [],
    },
  ]
}

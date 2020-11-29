Page({
  data: {
    image_srcs:[
      {
        index:1,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/9e941f339aa004983ab610987bb5e6d0.jpg"
      },
      {
        index:2,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/65bedb33ef5ff69c0eae841b2e8397da.jpg"
      },
      {
        index:3,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/423d8161d543e759d411fbd67aeef739.jpg"
      },
      {
        index:4,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/c9830c7593e9f764a48efdfed9bedcd5.jpg"
      },
      {
        index:5,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/timg-2.jpg"
      },
      {
        index:6,
        image_srcs: "https://s1.imagehub.cc/images/2020/11/25/u19940963011677991235fm26gp0.jpg"
      },
    ],
    circles:[
      {
        index:1,
        src:"https://s1.imagehub.cc/images/2020/11/24/d5455160cd1f77ad53419a53d3493e75.png",
        text:"正念（基础）",
        nav:"/pages/function1/function",
      },
      {
        index:2,
        src:"https://s1.imagehub.cc/images/2020/11/24/d5455160cd1f77ad53419a53d3493e75.png",
        text:"正念（进阶）",
        nav:"/pages/function2/function2",
      },
      {
        index:3,
        src:"https://s1.imagehub.cc/images/2020/11/24/13cb1cc01940e296477942b753481e08.png",
        text:"反思",
        nav:"/pages/reflection/reflection"
      },
      {
        index:4,
        src:"https://s1.imagehub.cc/images/2020/11/24/082e4b939b9dc0fe09a71e67b1cce9db.png",
        text:"微习惯",
        nav:"/pages/habit/habit"
      }
    ]
    
    
  },
  
  onShareAppMessage() {
    return {
      title: '攀登者',
      path: '/pages/index/index'
    }
  },
})

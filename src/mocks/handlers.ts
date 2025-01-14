import {http, HttpResponse} from 'msw'
import {faker} from "@faker-js/faker";

const User = [
  {user_id :1, id: 'elonmusk', nickname: 'Elon Musk', image: '/yRsRRjGO.jpg'},
  {user_id :2, id: 'zerohch0', nickname: '제로초', image: '/5Udwvqim.jpg'},
  {user_id :3, id: 'leoturtle', nickname: '레오', image: faker.image.avatar()},
]

function generateDate() {
  const lastWeek = new Date(Date.now());
  lastWeek.setDate(lastWeek.getDate() - 7);
  return faker.date.between({
    from: lastWeek,
    to: Date.now(),
  });
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const handlers = [
  http.post(`${baseUrl}/api/login`, () => {
    console.log('로그인');
    return HttpResponse.json(User[1], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    })
  }),
  http.post(`${baseUrl}/api/logout`, () => {
    console.log('로그아웃');
    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': 'connect.sid=;HttpOnly;Path=/;Max-Age=0'
      }
    })
  }),
  http.post(`${baseUrl}/api/users`, async ({ request }) => {
    console.log('회원가입');
    // return HttpResponse.text(JSON.stringify('user_exists'), {
    //   status: 403,
    // });
    return HttpResponse.json(JSON.stringify('ok'), {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    });
  }),
  http.get(`${baseUrl}/api/postsRecomends`, async ({ request }) => {
    console.log('포스트 조회');
    return HttpResponse.json([
      {
        postId: 1,
        User: User[0],
        content: `${1} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {imageId: 1, link: faker.image.urlLoremFlickr()},
          {imageId: 2, link: faker.image.urlLoremFlickr()},
        ],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {imageId: 1, link: faker.image.urlLoremFlickr()},
          {imageId: 2, link: faker.image.urlLoremFlickr()},
          {imageId: 3, link: faker.image.urlLoremFlickr()},
          {imageId: 4, link: faker.image.urlLoremFlickr()},
        ],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Z.com is so marvelous. I'm gonna buy that.`,
        Images: [
          {imageId: 1, link: faker.image.urlLoremFlickr()},
          {imageId: 2, link: faker.image.urlLoremFlickr()},
          {imageId: 3, link: faker.image.urlLoremFlickr()},
        ],
        createdAt: generateDate(),
      },
    ]
  )
}),
http.get(`${baseUrl}/api/followingPosts`, ({ request }) => {
  return HttpResponse.json(
    [
      {
        postId: 1,
        User: User[0],
        content: `${1} Stop following me. I'm too famous.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
      {
        postId: 2,
        User: User[0],
        content: `${2} Stop following me. I'm too famous.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
      {
        postId: 3,
        User: User[0],
        content: `${3} Stop following me. I'm too famous.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
      {
        postId: 4,
        User: User[0],
        content: `${4} Stop following me. I'm too famous.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
      {
        postId: 5,
        User: User[0],
        content: `${5} Stop following me. I'm too famous.`,
        Images: [{imageId: 1, link: faker.image.urlLoremFlickr()}],
        createdAt: generateDate(),
      },
    ], {
      headers: {
        'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/'
      },
    });
  })
];
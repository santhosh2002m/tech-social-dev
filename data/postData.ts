import avatar_1 from "/public/images/hell.jpg";
import avatar_3 from "/public/images/hell.jpg";
import avatar_4 from "/public/images/hell.jpg";
import avatar_5 from "/public/images/hell.jpg";
import avatar_7 from "/public/images/hell.jpg";
import post_img_1 from "/public/images/robo.png";
import { StaticImageData } from "next/image";

export interface PollOption {
  id: number;
  text: string;
  votes: number;
}

export interface PostData {
  id: number;
  postText: string;
  hashTags: string[];
  media?: string[]; // Array of URLs for media (images, videos, PDFs, GIFs)
  mediaType?: "image" | "video" | "pdf" | "gif" | "text" | "poll";
  poll?: PollOption[];
  authorName: string;
  authorAvt: StaticImageData;
  comments: Array<{
    id: number;
    commentText: string;
    authorName: string;
    authorAvt: StaticImageData;
    replies: Array<{
      id: number;
      replyText: string;
      authorName: string;
      authorAvt: StaticImageData;
    }>;
  }>;
}

const postData: PostData[] = [
  {
    id: 1,
    postText: `I created Roughly plugin to sketch crafted hand-drawn elements`,
    hashTags: [],
    media: [post_img_1.src], // Use .src for Next.js image
    mediaType: "image",
    authorName: "Lori Cortez",
    authorAvt: avatar_1,
    comments: [],
  },
  {
    id: 2,
    postText: `Check out this demo video of the Roughly plugin!`,
    hashTags: ["plugin", "demo"],
    media: ["/images/video.mp4"], // Static URL from /public
    mediaType: "video",
    authorName: "Lori Cortez",
    authorAvt: avatar_1,
    comments: [],
  },
  {
    id: 3,
    postText: `Documentation for Roughly plugin`,
    hashTags: [],
    media: ["/images/pdf.pdf"], // Static URL from /public
    mediaType: "pdf",
    authorName: "Loprayos",
    authorAvt: avatar_5,
    comments: [
      {
        id: 1,
        commentText:
          "The only way to solve the problem is to code for the hardware directly",
        authorName: "Lori Cortez",
        authorAvt: avatar_3,
        replies: [
          {
            id: 1,
            replyText: "The only way to solve the",
            authorName: "Alexa",
            authorAvt: avatar_4,
          },
          {
            id: 2,
            replyText: "The only way to solve the",
            authorName: "Haplika",
            authorAvt: avatar_7,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    postText: `A fun GIF to celebrate the plugin release!`,
    hashTags: ["gif", "celebration"],
    media: ["/images/gif..gif"], // Static URL from /public
    mediaType: "gif",
    authorName: "Lori Cortez",
    authorAvt: avatar_1,
    comments: [],
  },
  {
    id: 5,
    postText: `What do you think about the new plugin?`,
    hashTags: ["poll", "feedback"],
    mediaType: "poll",
    poll: [
      { id: 1, text: "Love it!", votes: 10 },
      { id: 2, text: "It's okay", votes: 5 },
      { id: 3, text: "Needs improvement", votes: 2 },
    ],
    authorName: "Lori Cortez",
    authorAvt: avatar_1,
    comments: [],
  },
  {
    id: 6,
    postText: `AI is reshaping daily life and various industries.
It offers vast potential, like improving healthcare and productivity.
However, ethical concerns and societal impacts must be carefully addressed.`,
    hashTags: [],
    mediaType: "text",
    authorName: "Loprayos",
    authorAvt: avatar_5,
    comments: [],
  },
];

export default postData;

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import PostAction from "./PostAction";

interface PostProps {
  postText: string;
  hashTags?: string[];
  imgs: StaticImageData[];
  authorName: string;
  authorAvt: StaticImageData;
}

const Post = ({ post }: { post: PostProps }) => {
  const { postText, authorAvt, authorName, hashTags, imgs } = post;

  return (
    <div className="top-area pb-5">
      <div className="profile-area d-center justify-content-between">
        <div className="avatar-item d-flex gap-3 align-items-center">
          <div className="avatar position-relative">
            <Image
              className="avatar-img max-un"
              src={authorAvt}
              alt={authorName}
              width={50} // Specify width (adjust as needed)
              height={50} // Specify height (adjust as needed)
            />
          </div>
          <div className="info-area">
            <h6 className="m-0">
              <Link href="/public-profile/post">{authorName}</Link>
            </h6>
            <span className="mdtxt status">@santhosh_007</span>
            <h6>bangalore</h6>
          </div>
        </div>
        <div className="btn-group cus-dropdown">
          <PostAction />
        </div>
      </div>
      <div className="py-4">
        <p className="description">{postText || ""}</p>
        <p className="hastag d-flex gap-2">
          {hashTags?.map((itm) => (
            <Link key={itm} href="#">
              #{itm}
            </Link>
          ))}
        </p>
      </div>
      <div
        className={`post-img ${
          imgs?.length > 1
            ? "d-flex justify-content-between flex-wrap gap-2 gap-lg-3"
            : ""
        } `}
      >
        {imgs.length > 0 ? (
          imgs?.length > 1 ? (
            <>
              <div className="single">
                <Image
                  src="/images/santhosh.jpeg" // Relative path from public directory
                  alt="image"
                  width={300} // Adjust width as needed
                  height={300} // Adjust height as needed
                />
              </div>
              <div className="single d-grid gap-3">
                {imgs[1] && (
                  <Image
                    src="/images/santhosh.jpeg" // Relative path
                    alt="image"
                    width={150} // Adjust width as needed
                    height={150} // Adjust height as needed
                  />
                )}
                {imgs[2] && (
                  <Image
                    src="/images/santhosh.jpeg" // Relative path
                    alt="image"
                    width={150} // Adjust width as needed
                    height={150} // Adjust height as needed
                  />
                )}
              </div>
            </>
          ) : (
            <Image
              src="/images/santhosh.jpeg"
              alt="image"
              className="w-100"
              width={500} // Adjust width as needed
              height={300} // Adjust height as needed
            />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Post;

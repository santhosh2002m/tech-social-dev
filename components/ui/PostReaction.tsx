import Image from "next/image";
import avatar_2 from "/public/images/avatar-2.png";
import avatar_3 from "/public/images/avatar-3.png";
import avatar_4 from "/public/images/avatar-4.png";

interface PostReactionProps {
  reaction?: string;
  toggleCommentSection: () => void; // Add toggle function prop
  isCommentSectionOpen: boolean; // Add state to reflect if comment section is open
}

const PostReaction: React.FC<PostReactionProps> = ({
  reaction = "",
  toggleCommentSection,
  isCommentSectionOpen,
}) => {
  return (
    <>
      <div className="like-comment-share py-5 d-center flex-wrap gap-3 gap-md-0 justify-content-between">
        <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> favorite </i>
          Like
        </button>
        <button
          className={`d-center gap-1 gap-sm-2 mdtxt ${
            isCommentSectionOpen ? "active" : ""
          }`}
          onClick={toggleCommentSection}
        >
          <i className="material-symbols-outlined mat-icon"> chat </i>
          Comment
        </button>
        <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> share </i>
          Share
        </button>
        <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> search </i>
          AI Search
        </button>
        <button className="d-center gap-1 gap-sm-2 mdtxt">
          <i className="material-symbols-outlined mat-icon"> visibility </i>
          View
        </button>
      </div>
    </>
  );
};

export default PostReaction;

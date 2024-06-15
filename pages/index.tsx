import { GetServerSideProps } from "next";
import HomeLayout from "@/components/HomeLayout";
import Post from "@/pages/home/post";
import CTA from "@/pages/home/cta";

type PostType = {
  number: number;
  name: string;
  title: string;
};

type HomeProps = {
  posts: PostType[];
};

export default function Home({ posts }: HomeProps) {
  return (
    <HomeLayout>
      <section className="container p-4 mx-auto">
        <div className="flex flex-row gap-8 justify-center">
          {posts.map((p) => (
            <Post
              key={p.number}
              number={p.number}
              name={p.name}
              title={p.title}
            />
          ))}
        </div>
      </section>
      <section className="container p-4 mx-auto">
        <CTA />
      </section>
    </HomeLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`);
  const posts: PostType[] = await res.json();

  return {
    props: {
      posts,
    },
  };
};

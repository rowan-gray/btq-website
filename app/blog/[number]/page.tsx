import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Heading, Lead } from "@/components/text";
import { ArrowLongLeftIcon } from "@heroicons/react/16/solid";
import RSSParser from "rss-parser";
import DOMPurify from "isomorphic-dompurify";
import parse from 'html-react-parser';
import type { Metadata } from 'next';
import { createPageMetadata } from "../../layout";

export const generateMetadata = ({ params }: { params: { number: number } }): Metadata => {
    return createPageMetadata({
        title: `Blog ${params.number}`,
        description: 'Explore the Better Transport Queensland blog, where engaged community members share their opinions and insights on public, active, and sustainable transport (not official policy). Stay informed and join the conversation!',
        slug: `blog/${params.number.toString()}`,
    });
};

export async function generateStaticParams() {
    const parser = new RSSParser();
    const feed = await parser.parseURL(
        "https://forum.bettertransportqueensland.org/c/media/blog/57.rss"
    );
    const items = feed.items || [];
    return items.map((_, i) => ({ number: (i + 1).toString() }));
}

export default async function Page({ params: { number } }: { params: { number: string } }) {
    const parser = new RSSParser();
    const feed = await parser.parseURL("https://forum.bettertransportqueensland.org/c/media/blog/57.rss");
    const items = feed.items || [];
    const post = items[Number(number) - 1];
    return (
        <main className="overflow-hidden">
            <Container>
                <Navbar />
            </Container>
            <Container className="mt-16 mb-16">
                <Heading as="h1">{post.title}</Heading>
                <Lead>{post.creator && <span className="mb-2">@{post.creator} {new Date(post.pubDate || "").toLocaleString()}</span>}</Lead>
                <a className="my-4 flex" href="/blog">
                    <ArrowLongLeftIcon className="size-5 text-pink-400" /> Go back to Blogs
                </a>
                <div>{parse(DOMPurify.sanitize(post.content || ""))}</div>
            </Container>
            <Footer />
        </main>
    )
}            

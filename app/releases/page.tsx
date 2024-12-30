import { Card } from "@/components/card";
import { Container } from "@/components/container";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Heading, Lead } from "@/components/text";
import React from "react";
import RSSParser from "rss-parser";

async function fetchPosts() {
    const parser = new RSSParser();
    const feed = await parser.parseURL(
        "https://forum.bettertransportqueensland.org/c/media/media-releases/11.rss"
    );
    return feed.items || [];
}

async function Snippets() {
    const posts = await fetchPosts();
    return (
        <Container className="mt-16 mb-16">
            <Heading as="h1">Media Releases</Heading>
            <Lead className="mt-6 max-w-3xl">
                Stay up to date with our latest media releases.
            </Lead>
            <ul className="mt-3">
                {posts.map((post, i) => (
                    <Card key={i} link={"/releases/" + (i + 1)}>
                        <Lead>{post.title}</Lead>
                        <div className="mb-2">@{post.creator} {new Date(post.pubDate || "").toLocaleString()}</div>
                        <div>{post.contentSnippet?.split("\n").slice(0, -2).join(" ")}</div>
                    </Card>
                ))}
            </ul>
        </Container>
    );
}

export default async function Page() {
    return (
        <main className="overflow-hidden">
            <Container>
                <Navbar />
            </Container>
            <Snippets/>
            <Footer />
        </main>
    );
}
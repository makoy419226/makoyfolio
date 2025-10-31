import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Tag } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    {
      title: "Getting Started with Web Development in 2024",
      excerpt: "A comprehensive guide for beginners looking to start their journey in web development. Learn about the essential tools, technologies, and best practices.",
      date: "March 15, 2024",
      tags: ["Web Development", "Tutorial", "Beginner"],
      readTime: "5 min read"
    },
    {
      title: "Python Automation: Streamlining Daily Tasks",
      excerpt: "Discover how Python can automate repetitive tasks and boost your productivity. From file management to web scraping, unlock the power of automation.",
      date: "March 10, 2024",
      tags: ["Python", "Automation", "Productivity"],
      readTime: "7 min read"
    },
    {
      title: "Best Practices for IT Systems Administration",
      excerpt: "Essential tips and strategies for managing IT infrastructure effectively. Learn about security, monitoring, and maintenance best practices.",
      date: "March 5, 2024",
      tags: ["IT", "Systems", "Best Practices"],
      readTime: "6 min read"
    },
    {
      title: "Building Responsive Websites with Modern CSS",
      excerpt: "Master the art of creating beautiful, responsive websites that work seamlessly across all devices using modern CSS techniques.",
      date: "February 28, 2024",
      tags: ["CSS", "Design", "Responsive"],
      readTime: "8 min read"
    }
  ];

  return (
    <section id="blog" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Latest Blog Posts</h2>
          <div className="w-20 h-1 bg-cyan-bright mx-auto rounded-full"></div>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Sharing insights, tutorials, and experiences from my journey in tech
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post, index) => (
            <Card 
              key={index}
              className="bg-gradient-card border-white/10 p-6 shadow-card backdrop-blur-sm hover:scale-105 hover:border-cyan-bright/50 transition-all duration-300 animate-slide-up group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                {/* Date & Read Time */}
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-bright transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-white/70 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <Button 
                  variant="ghost" 
                  className="text-cyan-bright hover:text-cyan-bright hover:bg-cyan-bright/10 p-0 h-auto group/btn"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center pt-8">
          <Button variant="heroOutline" size="lg">
            View All Posts
            <ArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;

import React from 'react';
import { FileText, Clock, AlertCircle } from 'lucide-react';

const BlogItem = ({ title, status, date }) => (
    <div className="group relative flex items-center gap-4 p-4 border border-white/5 bg-white/5 rounded-lg opacity-60 hover:opacity-100 transition-all duration-300 cursor-not-allowed hover:bg-white/10">
        <div className="p-3 bg-black/20 rounded text-accent-green">
            <FileText size={20} />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-lg font-mono font-medium text-white truncate">{title}</h3>
            <div className="flex items-center gap-4 mt-1 text-xs font-mono text-gray-500">
                <span className="flex items-center gap-1 text-accent-green/70">
                    <AlertCircle size={12} />
                    Status: {status}
                </span>
                <span className="flex items-center gap-1">
                    <Clock size={12} />
                    Date: {date}
                </span>
            </div>
        </div>
        <div className="px-3 py-1 bg-accent-green/10 text-accent-green text-xs font-mono rounded">
            LOG_PENDING
        </div>
    </div>
);

const Blog = () => {
    return (
        <div className="min-h-screen pt-24 px-6 max-w-4xl mx-auto">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">Development Logs</h1>
                <p className="text-gray-400 font-mono text-sm border-l-2 border-accent-green pl-4">
          // Accessing memory banks...<br />
          // Retrieval incomplete. Data compilation in progress.
                </p>
            </div>

            <div className="space-y-4">
                <BlogItem
                    title="Deconstructing the Agentic Loop"
                    status="[Compiling...]"
                    date="TBD"
                />
                <BlogItem
                    title="Why Vector DBs are the new RAM"
                    status="[Pending Input]"
                    date="TBD"
                />
                <BlogItem
                    title="Refactoring Reality: Improved RAG Pipelines"
                    status="[Queued]"
                    date="TBD"
                />
            </div>

            <div className="mt-12 p-6 bg-[#0f0f0f] border border-white/10 rounded-lg text-center">
                <h3 className="text-xl font-bold text-gray-300 mb-2">Subscribe to Neural Updates</h3>
                <p className="text-gray-500 text-sm mb-4">Get notified when these logs are fully compiled.</p>
                <div className="flex max-w-md mx-auto gap-2">
                    <input type="email" placeholder="Enter email address" className="bg-black/40 border border-white/10 rounded px-4 py-2 flex-1 outline-none focus:border-accent-green text-sm" />
                    <button className="px-4 py-2 bg-white/10 hover:bg-accent-green hover:text-black transition-colors rounded text-sm font-medium">
                        Subscribe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Blog;

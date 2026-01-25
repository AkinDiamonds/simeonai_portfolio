import React, { useState } from 'react';
import { Shield, Lock, LayoutDashboard, Folder, FileText, MessageSquare, Plus, Edit2, LogOut } from 'lucide-react';

const Admin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            setIsLoggedIn(true);
        }
    };

    const handleLogout = () => setIsLoggedIn(false);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-xl p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-900" />

                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-red-500/10 rounded-full text-red-500 border border-red-500/20">
                            <Lock size={32} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-white mb-2">Restricted Access</h2>
                    <p className="text-center text-gray-500 text-sm font-mono mb-8">System Admin Clearance Required</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-1">IDENTITY_KEY (EMAIL)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-red-500 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-mono text-gray-400 mb-1">ACCESS_CODE (PASSWORD)</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white outline-none focus:border-red-500 transition-colors"
                            />
                        </div>
                        <button type="submit" className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded transition-colors mt-2">
                            Authenticate
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0f0f0f] border-r border-white/5 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-2 text-white font-bold">
                        <Shield size={20} className="text-accent-green" />
                        <span>Admin Console</span>
                    </div>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
                    <SidebarItem icon={Folder} label="Projects" />
                    <SidebarItem icon={FileText} label="Blog Logs" />
                    <SidebarItem icon={MessageSquare} label="Messages" />
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center gap-3 text-gray-400 hover:text-white w-full px-4 py-2 rounded hover:bg-white/5 transition-colors">
                        <LogOut size={18} />
                        <span className="text-sm">Abort Session</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Project Database</h1>
                    <button className="flex items-center gap-2 px-4 py-2 bg-accent-green text-black font-bold rounded hover:bg-emerald-400 transition-colors">
                        <Plus size={18} />
                        Add New Project
                    </button>
                </div>

                <div className="bg-[#0f0f0f] border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/5 border-b border-white/10 text-gray-400 font-mono text-xs uppercase">
                                <th className="p-4">Project Name</th>
                                <th className="p-4">Stack</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {mockProjects.map((project, idx) => (
                                <tr key={idx} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 font-medium text-white">{project.name}</td>
                                    <td className="p-4 text-gray-400 text-sm">{project.stack}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${project.color}`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors">
                                            <Edit2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-2 rounded text-sm transition-colors ${active ? 'bg-accent-green/10 text-accent-green border border-accent-green/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
        <Icon size={18} />
        {label}
    </button>
);

const mockProjects = [
    { name: 'AI RAG System', stack: 'Python, LangChain', status: 'Deployed', color: 'bg-green-500/10 text-green-500' },
    { name: 'Speech Coach AI', stack: 'FastAPI, OpenAI', status: 'In Development', color: 'bg-yellow-500/10 text-yellow-500' },
    { name: 'Smart Portfolio v2', stack: 'React, Vite', status: 'Live', color: 'bg-blue-500/10 text-blue-500' },
    { name: 'Neural Network Viz', stack: 'Three.js, PyTorch', status: 'Archived', color: 'bg-gray-500/10 text-gray-500' },
];

export default Admin;

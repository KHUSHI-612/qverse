import Header from '../components/Header.jsx';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="layout">
            <Header />
            <main style={{ padding: '60px 24px', maxWidth: '800px', margin: '0 auto', fontFamily: 'var(--font-sans)' }}>

                {/* Hero Section */}
                <section style={{ marginBottom: '60px', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-1px' }}>
                        Welcome to <span style={{ color: 'var(--accent)' }}>Qverse</span>
                    </h1>
                    <p style={{ fontSize: '20px', lineHeight: '1.6', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                        A community-driven platform where knowledge flows freely. Ask questions, share insights, and grow together.
                    </p>
                </section>

                {/* What is Qverse */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '20px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
                        What is Qverse?
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text)', marginBottom: '16px' }}>
                        Qverse is more than just a Q&A site; it's a collaborative ecosystem for learners, experts, and curious minds.
                        Whether you're stuck on a coding problem, looking for career advice, or exploring new technologies,
                        Qverse connects you with the right people.
                    </p>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--text)' }}>
                        We believe that every question deserves a high-quality answer, and every answer contributes to a global library of knowledge.
                    </p>
                </section>

                {/* How it Works */}
                <section style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '30px', borderBottom: '2px solid var(--border)', paddingBottom: '10px' }}>
                        How It Works
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--input)', color: 'var(--accent)', fontWeight: 'bold', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>1</div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', marginTop: '0' }}>Ask a Question</h3>
                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--muted)', margin: 0 }}>
                                    Have a doubt? Post your question with relevant tags. Be specific to get the best answers.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--input)', color: 'var(--accent)', fontWeight: 'bold', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>2</div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', marginTop: '0' }}>Explore Answers</h3>
                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--muted)', margin: 0 }}>
                                    Read solutions from the community. Vote for the most helpful answers to help others find them too.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                            <div style={{ background: 'var(--input)', color: 'var(--accent)', fontWeight: 'bold', fontSize: '24px', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>3</div>
                            <div>
                                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '10px', marginTop: '0' }}>Build Reputation</h3>
                                <p style={{ fontSize: '16px', lineHeight: '1.6', color: 'var(--muted)', margin: 0 }}>
                                    Share your knowledge by answering questions. Earn reputation points and badges as you help others.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section style={{ textAlign: 'center', padding: '40px', background: 'var(--input)', borderRadius: '16px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>Ready to join the conversation?</h2>
                    <p style={{ fontSize: '18px', color: 'var(--muted)', marginBottom: '30px' }}>
                        Join thousands of developers and enthusiasts sharing knowledge today.
                    </p>
                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                        <Link to="/signup" className="button" style={{ textDecoration: 'none', padding: '12px 32px', fontSize: '18px' }}>
                            Get Started
                        </Link>
                        <Link to="/login" style={{ textDecoration: 'none', padding: '12px 32px', fontSize: '18px', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '8px' }}>
                            Login
                        </Link>
                    </div>
                </section>

            </main>
        </div>
    );
}

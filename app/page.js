'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // ============================================
      // TODO: Google Formを作成したら以下を設定
      // ============================================
      const FORM_ID = '1FAIpQLScClwTgsTS2KtP8ARF9uWXg6EimAJlZkPRmcUM-AhExGOPerg'; // Google FormのIDをここに貼る
      const ENTRY_ID = '1032374180'; // Entry IDをここに貼る（数字のみ）
      
      // Google FormのURL
      const formUrl = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
      
      // フォームデータを作成
      const formData = new FormData();
      formData.append(`entry.${ENTRY_ID}`, email);
      
      // Google Formに送信
      await fetch(formUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors', // CORSエラー回避（成功/失敗の判定はできないが送信はされる）
      });
      
      // 成功
      setSubmitted(true);
      setEmail(''); // フォームをリセット
      
    } catch (err) {
      console.error('送信エラー:', err);
      // no-corsモードでは実際にはエラーは起きないが、念のため
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* ヘッダー */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
            5
          </div>
          <span className="text-white text-xl font-bold">5drip</span>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* キャッチコピー */}
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            高品質で、かつ少量。<br />
            <span className="text-blue-400">搾り取った原液</span>を飲むように。
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            月5記事だけ。読むのも月150記事まで。
          </p>
          <p className="text-lg text-gray-400 mb-12">
            AIに埋もれない、本当に面白いコンテンツとの出会い。<br />
            クリエイター同士が支え合う「商店街型」プラットフォーム。
          </p>

          {/* メール登録フォーム */}
          {!submitted ? (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-4">
                事前登録受付中
              </h2>
              <p className="text-gray-300 mb-6">
                ベータ版リリース時にお知らせします
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your-email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                
                {error && (
                  <p className="text-red-400 text-sm">{error}</p>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '送信中...' : '事前登録する'}
                </button>
              </form>
              
              <p className="text-gray-500 text-xs mt-4">
                登録いただいたメールアドレスは、ベータ版の案内以外には使用しません。
              </p>
            </div>
          ) : (
            <div className="bg-green-500/20 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-green-500/50">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                登録完了！
              </h2>
              <p className="text-gray-300 mb-4">
                ベータ版リリース時にご連絡します。<br />
                お楽しみに！
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-400 hover:text-blue-300 text-sm underline"
              >
                別のメールアドレスで登録する
              </button>
            </div>
          )}

          {/* 特徴 */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-white mb-2">月5記事まで</h3>
              <p className="text-gray-400">
                量より質。本当に書きたいものだけを。
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-white mb-2">閲覧5円〜</h3>
              <p className="text-gray-400">
                クリエイターを直接支援。商店街のような温かさ。
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-white mb-2">ブレインロット防止</h3>
              <p className="text-gray-400">
                月150記事まで。時間を奪われない設計。
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>© 2025 5drip. All rights reserved.</p>
      </footer>
    </div>
  );
}
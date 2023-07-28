// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import React from 'react';
import { createRoot } from 'react-dom/client';
import HelloMessage from './components/App';

// /app/views/sites/index.html.erb削除に伴い、エラーがコンソールに表示されるので一旦コメントアウト
// const container = document.getElementById('root');
// const root = createRoot(container);

// document.addEventListener('DOMContentLoaded', () => {
//   root.render(<HelloMessage name="World" />);
// });

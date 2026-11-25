/* PASSO 1: livro girando conforme a rolagem */
const book = document.getElementById('book'), calmo = matchMedia('(prefers-reduced-motion:reduce)').matches;
let ticking = false;
addEventListener('scroll', () => {
    if (calmo || ticking) return; ticking = true;
    requestAnimationFrame(() => {
        const p = Math.min(scrollY / (innerHeight * .9), 1);   // progresso de 0 a 1
        book.style.setProperty('--ry', (-28 + p * 50) + 'deg'); // gira de -28° até 22°
        ticking = false;
    });
}, { passive: true });

/* PASSO 2: IntersectionObserver revela os elementos ao entrarem na tela */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* PASSO 3: aviso (toast) e botões de compra */
const toast = document.getElementById('toast');
function aviso(t) { toast.textContent = t; toast.classList.add('on'); setTimeout(() => toast.classList.remove('on'), 3500) }
document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); aviso('Plano "' + a.dataset.plan + '": aqui você colocaria o link do checkout (Hotmart, Kiwify...).');
}));

/* PASSO 4: download gerado pelo próprio JavaScript (Blob) */
document.getElementById('baixar').addEventListener('click', () => {
    const blob = new Blob(['Capítulo 1: Como a web funciona\n\n(Aqui entraria o conteúdo do capítulo.)'], { type: 'text/plain' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'capitulo-1.txt';
    document.body.appendChild(a); a.click(); a.remove(); aviso('Download iniciado. Em um site real, o link apontaria para o seu PDF.');
});
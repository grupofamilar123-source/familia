/* =========================================================================
   APP FAMILIAR — lógica completa
   Roles: "admin" (edita/elimina/añade) | "miembro" (ve, añade, descarga)
   ========================================================================= */

// ---------- Versículos para el Dashboard (rotan al azar cada carga) ----------
const VERSICULOS = [
  {t:"Mas si alguno no tiene cuidado de los suyos, y mayormente de los de su casa, ha negado la fe, y es peor que un incrédulo.", r:"1 Timoteo 5:8"},
  {t:"Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.", r:"Colosenses 3:23"},
  {t:"Como el padre se compadece de los hijos, se compadece Jehová de los que le temen.", r:"Salmos 103:13"},
  {t:"Mas yo y mi casa serviremos a Jehová.", r:"Josué 24:15"},
  {t:"El que anda en integridad anda confiado; mas el que pervierte sus caminos será quebrantado.", r:"Proverbios 10:9"},
  {t:"Jehová es mi pastor; nada me faltará.", r:"Salmos 23:1"},
  {t:"Encomienda a Jehová tu camino, y confía en él; y él hará.", r:"Salmos 37:5"},
  {t:"Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.", r:"Proverbios 22:6"},
  {t:"El amor es sufrido, es benigno; el amor no tiene envidia... todo lo sufre, todo lo cree, todo lo espera, todo lo soporta.", r:"1 Corintios 13:4,7"},
  {t:"No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo.", r:"Isaías 41:10"},
  {t:"Por tanto, no os afanéis por el día de mañana, porque el día de mañana traerá su afán.", r:"Mateo 6:34"},
  {t:"Si Jehová no edificare la casa, en vano trabajan los que la edifican.", r:"Salmos 127:1"}
];
function versiculoAleatorio(){ return VERSICULOS[Math.floor(Math.random()*VERSICULOS.length)]; }
document.getElementById('loginVerse').textContent = '"'+versiculoAleatorio().t+'"';

// ---------- Ciudades de Ecuador ----------
const CIUDADES_EC = ["Quito","Guayaquil","Cuenca","Ibarra","Ambato","Riobamba","Loja","Manta","Portoviejo",
"Machala","Esmeraldas","Santo Domingo","Latacunga","Tulcán","Otavalo","Cayambe","Sangolquí","Baños","Salinas",
"Babahoyo","Quevedo","Milagro","Durán","Puyo","Tena","Macas","Zamora","Nueva Loja (Lago Agrio)","Azogues","Guaranda"];

// ---------- Teléfonos de emergencia nacionales (referencia fija) ----------
const EMERGENCIA_EC = [
  {zona:"Ecuador (nacional)", servicio:"Emergencias (ECU 911)", tel:"911"},
  {zona:"Quito", servicio:"Bomberos Quito", tel:"102 / (02) 398-2500"},
  {zona:"Quito", servicio:"Policía Nacional", tel:"911 / (02) 398-9800"},
  {zona:"Quito", servicio:"Cruz Roja Pichincha", tel:"(02) 256-1739"},
  {zona:"Quito", servicio:"EMASEO / Riesgos Municipio", tel:"1800-847-247"},
  {zona:"Ibarra", servicio:"Bomberos Ibarra", tel:"102 / (06) 264-0102"},
  {zona:"Ibarra", servicio:"Policía Nacional Imbabura", tel:"911 / (06) 295-8100"},
  {zona:"Ibarra", servicio:"Hospital San Vicente de Paúl", tel:"(06) 295-7272"},
  {zona:"Ecuador (nacional)", servicio:"Secretaría de Gestión de Riesgos", tel:"1800-565656"},
  {zona:"Ecuador (nacional)", servicio:"Cruz Roja Ecuatoriana", tel:"(02) 258-0000"}
];

// ---------- Planes de seguridad profesionales (Quito) — semilla inicial ----------
const PLANES_SEED = [
{tipo:"Terremoto", contenido:`ANTES: Fijar muebles pesados y repisas a la pared; identificar zonas seguras en cada habitación (bajo mesas robustas, junto a columnas); definir punto de encuentro familiar fuera de la vivienda; preparar mochila de emergencia (agua, linterna, botiquín, radio, copias de documentos, silbato).
DURANTE: Agacharse, cubrirse y sujetarse ("Agáchate, Cúbrete, Sujétate"); alejarse de ventanas y objetos que puedan caer; si está en la calle, alejarse de edificios, postes y cables; no usar ascensores.
DESPUÉS: Verificar heridos y aplicar primeros auxilios; revisar fugas de gas y daños estructurales antes de reingresar; salir a punto de encuentro; escuchar radio/ECU911 para instrucciones oficiales; estar atentos a réplicas.`},
{tipo:"Fenómeno del Niño (lluvias/inundaciones)", contenido:`ANTES: Revisar y limpiar canaletas, techos y desagües; identificar rutas alternas a zonas altas; preparar kit de emergencia impermeable; monitorear alertas del INAMHI y Secretaría de Riesgos.
DURANTE: Evitar cruzar vías inundadas o quebradas crecidas (a pie o en auto); desconectar energía eléctrica si el agua ingresa a la vivienda; trasladarse a niveles superiores si es necesario; mantener contacto constante entre miembros del grupo familiar.
DESPUÉS: No consumir agua potable sin hervir/tratar; revisar contaminación de alimentos; documentar daños con fotos para seguros; evitar contacto con agua estancada por riesgo de enfermedades.`},
{tipo:"Incendio", contenido:`ANTES: Instalar detectores de humo y extintor tipo ABC en cocina; revisar instalaciones eléctricas y de gas periódicamente; definir dos rutas de salida por vivienda y punto de encuentro; enseñar a los niños a no esconderse sino salir.
DURANTE: Salir agachados si hay humo; no usar ascensores; cerrar puertas tras de sí para contener el fuego; si la ropa se incendia: Detente, Tírate y Rueda; llamar al 102/911 desde un lugar seguro.
DESPUÉS: No reingresar hasta autorización de Bomberos; ventilar la vivienda; revisar instalación eléctrica antes de reconectar; contactar al seguro con evidencia fotográfica.`},
{tipo:"Deslave / deslizamiento", contenido:`ANTES: Identificar si la vivienda está en zona de riesgo (laderas, quebradas) según mapas municipales; observar grietas en el terreno, árboles inclinados o agua turbia como señales de alerta; tener ruta de evacuación hacia zona alta y estable.
DURANTE: Evacuar de inmediato ante grietas nuevas, sonidos de tronido o movimiento de tierra; alejarse de la trayectoria del deslave, no cruzarlo; ayudar a personas mayores y niños primero.
DESPUÉS: No regresar hasta autorización de Gestión de Riesgos; reportar la zona a las autoridades; evaluar reubicación temporal si el riesgo persiste.`},
{tipo:"Robo / seguridad ciudadana", contenido:`ANTES: Instalar cerraduras de calidad, cámaras y buena iluminación exterior; no publicar en redes sociales viajes en tiempo real; conocer a los vecinos y activar alertas comunitarias; guardar objetos de valor fuera de vista desde ventanas.
DURANTE: Priorizar la vida sobre los bienes materiales; no oponer resistencia física; memorizar características del agresor sin confrontarlo; llamar al 911 apenas sea seguro hacerlo.
DESPUÉS: Presentar denuncia en Fiscalía/Policía; notificar al seguro si aplica; revisar y reforzar puntos vulnerables de acceso.`},
{tipo:"Corte de energía eléctrica prolongado", contenido:`ANTES: Tener linternas, radio a pilas y power banks cargados; identificar equipos médicos que dependan de electricidad y su respaldo; mantener reserva de agua (las bombas dejan de funcionar sin luz).
DURANTE: Desconectar equipos electrónicos sensibles para evitar daños al reconectar la luz; mantener el refrigerador cerrado el mayor tiempo posible; usar velas con extrema precaución (riesgo de incendio).
DESPUÉS: Revisar alimentos refrigerados antes de consumir; reconectar equipos gradualmente.`}
];

const MANUAL_EQUIPO_SEGURIDAD = `MANUAL DEL EQUIPO DE SEGURIDAD FAMILIAR

1. PROPÓSITO: Este equipo es responsable de revisar periódicamente las viviendas, escuelas, lugares de trabajo y vehículos del grupo familiar, e identificar riesgos y puntos seguros.

2. FRECUENCIA DE REVISIÓN: Cada vivienda y vehículo debe revisarse al menos trimestralmente, y tras cualquier evento (sismo, lluvia fuerte, incidente de seguridad).

3. CHECKLIST DE VIVIENDA: extintor vigente y accesible / detector de humo funcional / muebles pesados anclados / ruta de evacuación despejada / punto de encuentro definido / botiquín completo / cerraduras y luces exteriores en buen estado.

4. CHECKLIST DE ESCUELA/TRABAJO: conocer protocolo de emergencia del establecimiento / identificar punto de encuentro institucional / tener contacto de emergencia actualizado en el registro de la institución / ruta más segura de acceso.

5. CHECKLIST DE VEHÍCULO: botiquín, triángulos y extintor vigentes / documentos al día (matrícula, SOAT si aplica) / revisión de frenos y llantas / kit de emergencia (agua, linterna, cargador).

6. RECOMENDACIONES DE LUGARES SEGUROS (a completar por el equipo tras cada revisión): registrar en la ficha de cada punto revisado cuáles son las zonas seguras internas, rutas de salida y contactos del sector.

7. REPORTE: tras cada revisión, el equipo debe registrar hallazgos y recomendaciones en el sistema (área Seguridad) para que el administrador y los miembros puedan consultarlos.`;

// ---------- Recomendaciones estáticas (motor de sugerencias "IA gratuita" basado en reglas) ----------
const REC_SEGUROS = `RECOMENDACIONES GENERALES DE SEGUROS PARA EL GRUPO FAMILIAR:
• Seguro de vida: prioritario para el(los) proveedor(es) principal(es) de ingresos — protege al resto del grupo ante pérdida de ingreso familiar.
• Seguro de salud/médico: esencial si algún miembro tiene condiciones preexistentes o los hijos son menores; revisar cobertura de emergencias y hospitalización.
• Seguro vehicular contra todo riesgo: recomendado en Quito por el alto tráfico y riesgo de robo; el básico (RC) es el mínimo aceptable.
• Seguro de hogar: cubre incendio, robo y eventos naturales (sismo, deslave) — muy relevante dada la zona sísmica y las lluvias estacionales.
• Seguro de accidentes personales: útil para miembros que practican deportes o viajan con frecuencia.
Se recomienda revisar coberturas anualmente y mantener copia digital de pólizas en la nube (OneDrive) enlazada en esta sección.`;

function recomendacionEstructura(problema){
  if(!problema) return "";
  const p = problema.toLowerCase();
  if(p.includes('humedad')||p.includes('filtracion')||p.includes('filtración')) return "Revisar impermeabilización de techo/losa y sellado de ventanas; contratar inspección de humedad; ventilar espacios afectados para evitar moho.";
  if(p.includes('grieta')||p.includes('fisura')) return "Documentar con fotos y fecha; consultar a un ingeniero civil para descartar problema estructural antes de sellar; monitorear si la grieta crece.";
  if(p.includes('electric')) return "Contratar revisión de un electricista certificado; no sobrecargar tomacorrientes; considerar actualizar el tablero si la vivienda es antigua.";
  if(p.includes('plomer')||p.includes('tuber')||p.includes('fuga')) return "Cerrar la llave de paso si hay fuga activa; contactar un plomero certificado; revisar el historial de consumo de agua para detectar fugas ocultas.";
  if(p.includes('techo')||p.includes('cubierta')) return "Inspeccionar cubierta tras temporada de lluvias; reparar tejas/planchas sueltas antes de que se agrave la filtración.";
  return "Documentar el problema con fotos, fecha y ubicación; solicitar cotización a un profesional del área correspondiente; dar seguimiento en el checklist de cumplimiento.";
}

function recomendacionMedica(enfermedad){
  if(!enfermedad) return "";
  const e = enfermedad.toLowerCase();
  const tabla = {
    "gripe":"Reposo, hidratación abundante, paracetamol para fiebre/dolor según indicación de dosis por peso y edad. Consultar médico si la fiebre persiste más de 3 días.",
    "resfriado":"Hidratación, reposo, suero fisiológico nasal en niños. Evitar antibióticos sin indicación médica (es viral).",
    "gastritis":"Evitar comidas irritantes, picantes y café; fraccionar comidas; consultar si hay dolor persistente o sangrado.",
    "migrana":"Reposo en ambiente oscuro y silencioso, hidratación, analgésico según indicación médica; identificar y evitar desencadenantes.",
    "migraña":"Reposo en ambiente oscuro y silencioso, hidratación, analgésico según indicación médica; identificar y evitar desencadenantes.",
    "hipertension":"Control regular de presión arterial, reducir sal, actividad física moderada, seguimiento médico periódico.",
    "hipertensión":"Control regular de presión arterial, reducir sal, actividad física moderada, seguimiento médico periódico.",
    "diabetes":"Control de glicemia según indicación médica, dieta balanceada baja en azúcares simples, actividad física regular, chequeos periódicos.",
    "asma":"Evitar desencadenantes (polvo, humo, frío intenso), tener siempre a mano el inhalador de rescate indicado por el médico, control periódico con neumólogo.",
    "alergia":"Identificar y evitar el alergeno conocido; tener antihistamínico indicado por el médico disponible; en reacciones severas acudir a emergencia inmediatamente."
  };
  for(const k in tabla){ if(e.includes(k)) return tabla[k]; }
  return "Se recomienda consultar con un médico general para diagnóstico y tratamiento adecuado; mantener registro de síntomas y evolución en esta sección.";
}

function citasPorEdad(edad){
  const citas=[];
  if(edad<1) citas.push({tipo:"Control de niño sano (pediatría)", frecuencia:"Mensual el primer año"});
  else if(edad<12) citas.push({tipo:"Control pediátrico + vacunas", frecuencia:"Anual"});
  else if(edad<18) citas.push({tipo:"Control médico general + odontología", frecuencia:"Anual"});
  else if(edad<40) citas.push({tipo:"Chequeo médico general, odontología, oftalmología", frecuencia:"Anual"});
  else if(edad<50){ citas.push({tipo:"Chequeo general + perfil lipídico/glicemia", frecuencia:"Anual"}); citas.push({tipo:"Examen de la vista", frecuencia:"Cada 2 años"});}
  else { citas.push({tipo:"Chequeo general + perfil lipídico/glicemia/presión", frecuencia:"Cada 6 meses"}); citas.push({tipo:"Examen de próstata / mamografía y papanicolau (según sexo)", frecuencia:"Anual"}); citas.push({tipo:"Densitometría ósea", frecuencia:"Cada 2 años (desde 50)"});}
  citas.push({tipo:"Odontología", frecuencia:"Cada 6 meses"});
  return citas;
}

const IDEAS_BANCO = {
  "paseo":["Visitar el Parque Metropolitano o Parque La Carolina con juegos y bicicletas.","Excursión de un día a Mindo (naturaleza, tarabitas, chocolate).","Ruta gastronómica por el Centro Histórico de Quito.","Día de piscina/spa en familia."],
  "aprendizaje":["Taller familiar de repostería una vez al mes.","Club de lectura familiar con un libro por mes.","Clases básicas de primeros auxilios para todo el grupo.","Aprender juntos un idioma con una app 15 min al día."],
  "ahorro":["Reto de ahorro familiar: cada miembro aporta un monto fijo semanal a un frasco/meta.","Día sin gastos una vez por semana.","Comparar y renegociar planes de telefonía/internet del grupo familiar."],
  "salud":["Caminata familiar los domingos en la mañana.","Reto de tomar 2L de agua al día con seguimiento en grupo.","Preparar juntos un menú semanal saludable."],
  "convivencia":["Noche de juegos de mesa una vez al mes.","Cena rotativa: cada núcleo familiar organiza una vez al mes.","Videollamada familiar mensual con los que viven en otra ciudad."]
};
function generarIdeas(tema){
  const t = (tema||"").toLowerCase();
  for(const k in IDEAS_BANCO){ if(t.includes(k)) return IDEAS_BANCO[k]; }
  return ["Organizar una actividad relacionada a \""+tema+"\" con roles definidos para cada miembro.",
          "Crear un pequeño presupuesto y cronograma para \""+tema+"\".",
          "Invitar a cada núcleo familiar a proponer una idea relacionada a \""+tema+"\" y votar en la sección de encuestas."];
}

function recomendacionViaje(){
  return {
    llevar:["Documentos de identidad de cada miembro","Botiquín básico","Agua y snacks para el trayecto","Cargadores y power bank","Ropa según clima del destino","Efectivo pequeño + tarjeta"],
    presupuesto:"Sugerencia: estimar transporte + hospedaje + alimentación + actividades, y añadir 15% de imprevistos. Definir un tope por núcleo familiar antes de salir.",
    ahorrar:["Viajar en grupo para compartir transporte","Llevar snacks propios en vez de comprar en ruta","Reservar hospedaje con anticipación","Elegir actividades gratuitas o de bajo costo (parques, senderos, miradores)"]
  };
}

// ---------- Utilidades ----------
function uid(){ return 'id_'+Math.random().toString(36).slice(2,10)+Date.now().toString(36); }
function edadDesde(fecha){
  if(!fecha) return '';
  const b=new Date(fecha), t=new Date();
  let e=t.getFullYear()-b.getFullYear();
  const m=t.getMonth()-b.getMonth();
  if(m<0||(m===0&&t.getDate()<b.getDate())) e--;
  return e;
}
function fmtFecha(f){ if(!f) return '—'; const d=new Date(f+'T00:00:00'); return d.toLocaleDateString('es-EC',{day:'2-digit',month:'long'}); }
function diasHastaCumple(fecha){
  if(!fecha) return 9999;
  const hoy=new Date(); hoy.setHours(0,0,0,0);
  const b=new Date(fecha+'T00:00:00');
  let prox=new Date(hoy.getFullYear(),b.getMonth(),b.getDate());
  if(prox<hoy) prox=new Date(hoy.getFullYear()+1,b.getMonth(),b.getDate());
  return Math.round((prox-hoy)/86400000);
}
function money(n){ return '$'+(parseFloat(n)||0).toFixed(2); }
function initials(name){ return (name||'?').split(' ').filter(Boolean).slice(0,2).map(w=>w[0].toUpperCase()).join(''); }

// ---------- Estado global ----------
let CURRENT_USER = null;   // {uid, email, rol, miembroId}
let DATA = { miembros:[], familias:[], planes:[], equipoRevisiones:[], fondos:{aportes:[],gastos:[],convenios:[],banco:'',saldoManual:null},
             seguros:[], telefonos:[], estructuras:[], diversionPropuestas:[], diversionRespuestas:[], salud:[], ideas:[] };
let CURRENT_VIEW = 'dashboard';
const isAdmin = ()=> CURRENT_USER && CURRENT_USER.rol==='admin';

// ============================================================
// AUTENTICACIÓN
// ============================================================
document.getElementById('loginForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const email=document.getElementById('loginEmail').value.trim();
  const pass=document.getElementById('loginPassword').value;
  const errEl=document.getElementById('loginError');
  errEl.textContent='';
  try{
    await auth.signInWithEmailAndPassword(email, pass);
  }catch(err){
    errEl.textContent = 'No se pudo iniciar sesión. Verifica tu correo y contraseña.';
  }
});
document.getElementById('logoutBtn').addEventListener('click', (e)=>{ e.preventDefault(); auth.signOut(); });

auth.onAuthStateChanged(async (user)=>{
  if(user){
    const udoc = await db.collection('usuarios').doc(user.uid).get();
    const perfil = udoc.exists ? udoc.data() : {rol:'miembro', nombre:user.email};
    CURRENT_USER = {uid:user.uid, email:user.email, rol:perfil.rol||'miembro', miembroId:perfil.miembroId||null, nombre:perfil.nombre||user.email};
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');
    document.getElementById('userboxName').textContent = CURRENT_USER.nombre;
    document.getElementById('userboxRole').textContent = CURRENT_USER.rol==='admin'?'Administrador':'Miembro';
    document.getElementById('userboxRole').className = 'pill '+(CURRENT_USER.rol==='admin'?'gold':'');
    document.querySelectorAll('.admin-only').forEach(el=> el.classList.toggle('hidden', CURRENT_USER.rol!=='admin'));
    await cargarTodo();
    render('dashboard');
  } else {
    CURRENT_USER=null;
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appShell').classList.add('hidden');
  }
});

// ============================================================
// CARGA DE DATOS (Firestore) — con fallback a datos semilla si están vacíos
// ============================================================
async function colToArray(name){
  const snap = await db.collection(name).get();
  return snap.docs.map(d=>({id:d.id, ...d.data()}));
}
async function cargarTodo(){
  try{
    const [miembros, familias, planes, equipoRevisiones, seguros, telefonos, estructuras, diversionPropuestas, diversionRespuestas, salud, ideas] =
      await Promise.all(['miembros','familias','planesSeguridad','revisionesSeguridad','seguros','telefonos','estructuras','diversionPropuestas','diversionRespuestas','salud','ideas'].map(colToArray));
    DATA.miembros=miembros; DATA.familias=familias;
    DATA.planes = planes.length? planes : PLANES_SEED.map(p=>({id:uid(),...p}));
    DATA.equipoRevisiones=equipoRevisiones;
    DATA.seguros=seguros; DATA.telefonos=telefonos; DATA.estructuras=estructuras;
    DATA.diversionPropuestas=diversionPropuestas; DATA.diversionRespuestas=diversionRespuestas;
    DATA.salud=salud; DATA.ideas=ideas;
    const fondosDoc = await db.collection('fondos').doc('main').get();
    DATA.fondos = fondosDoc.exists? fondosDoc.data() : {aportes:[],gastos:[],convenios:[],banco:''};
  }catch(err){
    console.warn('Firestore no disponible aún, usando datos de ejemplo locales.', err);
    if(!DATA.planes.length) DATA.planes = PLANES_SEED.map(p=>({id:uid(),...p}));
  }
}
async function guardarDoc(col, item){
  const id = item.id || uid();
  const data = {...item}; delete data.id;
  await db.collection(col).doc(id).set(data, {merge:true});
  return id;
}
async function borrarDoc(col, id){ await db.collection(col).doc(id).delete(); }
async function guardarFondos(){ await db.collection('fondos').doc('main').set(DATA.fondos); }

// ============================================================
// NAVEGACIÓN
// ============================================================
document.querySelectorAll('.navitem').forEach(item=>{
  item.addEventListener('click', ()=>{ render(item.dataset.view); });
});
function setActiveNav(view){
  document.querySelectorAll('.navitem').forEach(n=> n.classList.toggle('active', n.dataset.view===view));
}
function render(view){
  CURRENT_VIEW = view;
  setActiveNav(view);
  const c = document.getElementById('content');
  c.innerHTML = '';
  const renderers = {
    dashboard: renderDashboard, grupo: renderGrupo, seguridad: renderSeguridad, fondos: renderFondos,
    seguros: renderSeguros, telefonos: renderTelefonos, cumpleanos: renderCumpleanos, estructuras: renderEstructuras,
    diversion: renderDiversion, planificacion: renderPlanificacion, salud: renderSalud, ideas: renderIdeas,
    accesos: renderAccesos
  };
  (renderers[view]||renderDashboard)();
}

function topbar(titulo, subtitulo, extraBtnsHtml){
  return `<header class="topbar">
    <div><h1>${titulo}</h1><p class="muted">${subtitulo||''}</p></div>
    <div class="toolbar no-print">${extraBtnsHtml||''}
      <button class="btn secondary" onclick="window.print()">🖨️ Imprimir / Exportar</button>
    </div>
  </header>`;
}
function nombreFamilia(familiaId){ const f=DATA.familias.find(x=>x.id===familiaId); return f? f.nombre : '(sin grupo)'; }

// ============================================================
// MODAL genérico para formularios
// ============================================================
function openModal(title, bodyHtml, onSubmit){
  const root = document.getElementById('modalRoot');
  root.innerHTML = `<div class="modal-bg" id="modalBg"><div class="modal">
    <span class="close-x" id="modalClose">✕</span>
    <h3>${title}</h3>
    <form id="modalForm">${bodyHtml}
      <div style="margin-top:16px;display:flex;gap:8px;justify-content:flex-end">
        <button type="button" class="btn secondary" id="modalCancel">Cancelar</button>
        <button type="submit" class="btn">Guardar</button>
      </div>
    </form>
  </div></div>`;
  document.getElementById('modalClose').onclick = closeModal;
  document.getElementById('modalCancel').onclick = closeModal;
  document.getElementById('modalBg').onclick = (e)=>{ if(e.target.id==='modalBg') closeModal(); };
  document.getElementById('modalForm').onsubmit = async (e)=>{ e.preventDefault(); await onSubmit(new FormData(e.target)); closeModal(); };
}
function closeModal(){ document.getElementById('modalRoot').innerHTML=''; }
function opciones(arr, selected){ return arr.map(v=>`<option value="${v}" ${v===selected?'selected':''}>${v}</option>`).join(''); }
function opcionesFamilias(selected){ return `<option value="">— sin grupo —</option>` + DATA.familias.map(f=>`<option value="${f.id}" ${f.id===selected?'selected':''}>${f.nombre}</option>`).join(''); }
function requireAdmin(){ if(!isAdmin()){ alert('Solo el administrador puede editar o eliminar información.'); return false;} return true; }

/* =========================================================================
   1) DASHBOARD
   ========================================================================= */
function renderDashboard(){
  const v = versiculoAleatorio();
  const proxCumples = [...DATA.miembros].filter(m=>m.fechaNacimiento).sort((a,b)=>diasHastaCumple(a.fechaNacimiento)-diasHastaCumple(b.fechaNacimiento)).slice(0,4);
  const ideasRecientes = [...DATA.ideas].slice(-4).reverse();
  const telsRecientes = [...DATA.telefonos].slice(-5).reverse();
  const saldo = calcularSaldoFondos();

  document.getElementById('content').innerHTML = `
  ${topbar('Dashboard', 'Resumen general del plan familiar')}
  <div class="verse-box">
    <div class="muted" style="color:rgba(255,255,255,.7)">Versículo del día</div>
    <h2 style="margin-top:8px">"${v.t}"</h2>
    <span class="ref">${v.r}</span>
  </div>
  <div class="grid cols-3">
    <div class="card"><div class="muted">Grupos familiares</div><h2>${DATA.familias.length}</h2></div>
    <div class="card"><div class="muted">Miembros registrados</div><h2>${DATA.miembros.length}</h2></div>
    <div class="card"><div class="muted">Saldo fondo de contingencia</div><h2>${money(saldo)}</h2></div>
  </div>
  <div class="grid cols-2">
    <div class="card">
      <h3>🎂 Próximos cumpleaños</h3>
      ${proxCumples.length? proxCumples.map(m=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)">
        <span>${m.nombre}</span><span class="pill">${fmtFecha(m.fechaNacimiento)} · en ${diasHastaCumple(m.fechaNacimiento)}d</span></div>`).join('') : '<p class="muted">Sin registros aún.</p>'}
    </div>
    <div class="card">
      <h3>📞 Teléfonos recientes</h3>
      ${telsRecientes.length? telsRecientes.map(t=>`<div style="padding:8px 0;border-bottom:1px solid var(--border)">
        <b>${t.nombre}</b> <span class="muted">(${t.relacion||'—'}, ${t.ciudad||'—'})</span><br><span class="muted">${t.telefono}</span></div>`).join('') : '<p class="muted">Sin registros aún.</p>'}
    </div>
  </div>
  <div class="grid cols-2">
    <div class="card">
      <h3>💡 Últimas ideas</h3>
      ${ideasRecientes.length? ideasRecientes.map(i=>`<div style="padding:8px 0;border-bottom:1px solid var(--border)"><b>${i.tema}</b><br><span class="muted">${i.idea}</span></div>`).join('') : '<p class="muted">Sin ideas registradas aún.</p>'}
    </div>
    <div class="card">
      <h3>📋 Resumen del plan familiar</h3>
      <p class="muted">Áreas activas y su estado general:</p>
      <div class="tag-row">
        <span class="pill">${DATA.planes.length} planes de seguridad</span>
        <span class="pill">${DATA.seguros.length} pólizas registradas</span>
        <span class="pill">${DATA.estructuras.length} bienes registrados</span>
        <span class="pill">${DATA.diversionPropuestas.length} propuestas de diversión</span>
        <span class="pill">${DATA.salud.length} fichas de salud</span>
      </div>
    </div>
  </div>`;
}
function calcularSaldoFondos(){
  const aportes=(DATA.fondos.aportes||[]).reduce((s,a)=>s+(parseFloat(a.monto)||0),0);
  const gastos=(DATA.fondos.gastos||[]).reduce((s,g)=>s+(parseFloat(g.monto)||0),0);
  return aportes-gastos;
}

/* =========================================================================
   2) GRUPO FAMILIAR
   ========================================================================= */
function renderGrupo(){
  const grupos = {};
  DATA.miembros.forEach(m=>{ const k=m.familiaId||'sin'; grupos[k]=grupos[k]||[]; grupos[k].push(m); });

  document.getElementById('content').innerHTML = `
  ${topbar('Grupo familiar', `${DATA.familias.length} grupos familiares · ${DATA.miembros.length} miembros`,
    (isAdmin()? '<button class="btn secondary" onclick="abrirFormFamilia()">+ Nuevo grupo</button> <button class="btn" onclick="abrirFormMiembro()">+ Nuevo miembro</button>':''))}
  <div id="gruposContainer"></div>`;

  const cont = document.getElementById('gruposContainer');
  if(DATA.familias.length===0 && DATA.miembros.length===0){
    cont.innerHTML = '<div class="card"><p class="muted">Aún no hay grupos familiares ni miembros registrados. '+(isAdmin()?'Usa los botones de arriba para comenzar.':'Pide a tu administrador que los registre.')+'</p></div>';
    return;
  }
  const familiasIds = DATA.familias.length? DATA.familias.map(f=>f.id) : ['sin'];
  familiasIds.concat(grupos['sin']&&!DATA.familias.length?[]:[]).forEach(()=>{});
  let html='';
  DATA.familias.forEach(f=>{
    html += renderFichaGrupo(f, grupos[f.id]||[]);
  });
  if(grupos['sin'] && grupos['sin'].length){
    html += renderFichaGrupo({id:'sin', nombre:'Sin grupo asignado'}, grupos['sin']);
  }
  cont.innerHTML = html;
}
function renderFichaGrupo(familia, miembros){
  return `<div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h3>👪 ${familia.nombre} <span class="pill" style="margin-left:6px">${miembros.length} miembro(s)</span></h3>
      ${isAdmin() && familia.id!=='sin' ? `<div><button class="btn small secondary" onclick="abrirFormFamilia('${familia.id}')">Editar grupo</button> <button class="btn small danger" onclick="eliminarFamilia('${familia.id}')">Eliminar</button></div>`:''}
    </div>
    <div class="grid cols-2">
      ${miembros.map(m=>renderFichaMiembro(m)).join('') || '<p class="muted">Sin miembros en este grupo.</p>'}
    </div>
  </div>`;
}
function renderFichaMiembro(m){
  const contactos = (m.contactos||[]).filter(c=>c.nombre||c.telefono);
  const amigos = (m.amigos||[]).filter(a=>a.nombre||a.telefono);
  return `<div class="card" style="margin-bottom:0;background:#fafbfd">
    <div style="display:flex;gap:10px;align-items:center">
      <div class="avatar-init">${initials(m.nombre)}</div>
      <div><b>${m.nombre}</b><br><span class="muted">${m.sexo||'—'} · ${edadDesde(m.fechaNacimiento)} años · ${fmtFecha(m.fechaNacimiento)}</span></div>
    </div>
    <table style="margin-top:10px">
      <tr><td class="muted">Tipo de sangre</td><td>${m.tipoSangre||'—'}</td></tr>
      <tr><td class="muted">Trabajo/estudio</td><td>${m.direccionTrabajo||'—'}</td></tr>
      <tr><td class="muted">Alergias</td><td>${m.alergias||'Ninguna registrada'}</td></tr>
      <tr><td class="muted">Punto de encuentro cercano</td><td>${m.puntoEncuentro||'—'}</td></tr>
    </table>
    ${contactos.length? `<div class="muted" style="margin-top:8px">Teléfonos de contacto:</div>${contactos.map(c=>`<div style="font-size:13px">• ${c.nombre}: ${c.telefono}</div>`).join('')}` : ''}
    ${amigos.length? `<div class="muted" style="margin-top:8px">Amigos cercanos:</div>${amigos.map(a=>`<div style="font-size:13px">• ${a.nombre}: ${a.telefono}</div>`).join('')}` : ''}
    <div style="margin-top:10px" class="no-print">
      ${isAdmin()? `<button class="btn small secondary" onclick="abrirFormMiembro('${m.id}')">Editar</button> <button class="btn small danger" onclick="eliminarMiembro('${m.id}')">Eliminar</button>` : ''}
    </div>
  </div>`;
}
window.abrirFormFamilia = function(id){
  if(id && !requireAdmin()) return;
  const f = id? DATA.familias.find(x=>x.id===id) : {nombre:''};
  openModal(id?'Editar grupo familiar':'Nuevo grupo familiar', `
    <label>Nombre del grupo familiar</label><input name="nombre" required value="${f.nombre||''}">`,
    async (fd)=>{
      const item = {id, nombre: fd.get('nombre')};
      const newId = await guardarDoc('familias', item);
      if(!id){ item.id=newId; DATA.familias.push(item); } else { Object.assign(f, item); }
      render('grupo');
    });
};
window.eliminarFamilia = async function(id){
  if(!requireAdmin()) return;
  if(!confirm('¿Eliminar este grupo familiar? Los miembros quedarán sin grupo asignado.')) return;
  await borrarDoc('familias', id);
  DATA.familias = DATA.familias.filter(f=>f.id!==id);
  DATA.miembros.forEach(m=>{ if(m.familiaId===id) m.familiaId=''; });
  render('grupo');
};
window.abrirFormMiembro = function(id){
  const m = id? DATA.miembros.find(x=>x.id===id) : {contactos:[{},{},{},{},{}], amigos:[{},{}]};
  if(id && !isAdmin() && CURRENT_USER.miembroId!==id){ alert('Solo puedes editar tu propia ficha o eres administrador.'); return; }
  const contactos = (m.contactos&&m.contactos.length? m.contactos: [{},{},{},{},{}]).slice(0,5);
  while(contactos.length<5) contactos.push({});
  const amigos = (m.amigos&&m.amigos.length? m.amigos:[{},{}]);
  openModal(id?'Editar ficha de miembro':'Nuevo miembro del grupo familiar', `
    <div class="grid cols-2">
    <div><label>Nombre completo</label><input name="nombre" required value="${m.nombre||''}"></div>
    <div><label>Sexo</label><select name="sexo"><option ${m.sexo==='Femenino'?'selected':''}>Femenino</option><option ${m.sexo==='Masculino'?'selected':''}>Masculino</option></select></div>
    <div><label>Fecha de nacimiento</label><input type="date" name="fechaNacimiento" value="${m.fechaNacimiento||''}"></div>
    <div><label>Tipo de sangre</label><select name="tipoSangre"><option value="">—</option>${opciones(['O+','O-','A+','A-','B+','B-','AB+','AB-'], m.tipoSangre)}</select></div>
    <div><label>Grupo familiar</label><select name="familiaId">${opcionesFamilias(m.familiaId)}</select></div>
    <div><label>Dirección de trabajo/estudio</label><input name="direccionTrabajo" value="${m.direccionTrabajo||''}"></div>
    </div>
    <label>Alergias</label><input name="alergias" placeholder="Ej: penicilina, maní..." value="${m.alergias||''}">
    <label>Punto de encuentro cercano (en caso de emergencia)</label><input name="puntoEncuentro" value="${m.puntoEncuentro||''}">
    <label>Teléfonos de contacto (hasta 5)</label>
    ${contactos.map((c,i)=>`<div class="grid cols-2" style="margin-bottom:4px">
      <input name="contNombre${i}" placeholder="Nombre (ej: Mamá, Trabajo...)" value="${c.nombre||''}">
      <input name="contTel${i}" placeholder="Teléfono" value="${c.telefono||''}"></div>`).join('')}
    <label>Amigos cercanos</label>
    ${amigos.map((a,i)=>`<div class="grid cols-2" style="margin-bottom:4px">
      <input name="amigoNombre${i}" placeholder="Nombre" value="${a.nombre||''}">
      <input name="amigoTel${i}" placeholder="Teléfono" value="${a.telefono||''}"></div>`).join('')}
    `,
    async (fd)=>{
      const item = {id, nombre:fd.get('nombre'), sexo:fd.get('sexo'), fechaNacimiento:fd.get('fechaNacimiento'),
        tipoSangre:fd.get('tipoSangre'), familiaId:fd.get('familiaId'), direccionTrabajo:fd.get('direccionTrabajo'),
        alergias:fd.get('alergias'), puntoEncuentro:fd.get('puntoEncuentro'),
        contactos:[0,1,2,3,4].map(i=>({nombre:fd.get('contNombre'+i)||'', telefono:fd.get('contTel'+i)||''})),
        amigos:[0,1].map(i=>({nombre:fd.get('amigoNombre'+i)||'', telefono:fd.get('amigoTel'+i)||''}))
      };
      const newId = await guardarDoc('miembros', item);
      if(!id){ item.id=newId; DATA.miembros.push(item); } else { Object.assign(m, item); }
      render('grupo');
    });
};
window.eliminarMiembro = async function(id){
  if(!requireAdmin()) return;
  if(!confirm('¿Eliminar este miembro del grupo familiar?')) return;
  await borrarDoc('miembros', id);
  DATA.miembros = DATA.miembros.filter(m=>m.id!==id);
  render('grupo');
};

/* =========================================================================
   3) SEGURIDAD
   ========================================================================= */
function renderSeguridad(){
  document.getElementById('content').innerHTML = `
  ${topbar('Seguridad', 'Planes de contingencia y equipo de seguridad familiar', isAdmin()?'<button class="btn" onclick="abrirFormPlan()">+ Nuevo plan</button>':'')}
  <div class="grid cols-2" id="planesContainer"></div>
  <div class="card">
    <h3>👥 Equipo de seguridad — Manual</h3>
    <p class="muted">Responsable de revisar viviendas, escuelas, trabajo y vehículos, y recomendar zonas seguras.</p>
    <pre style="white-space:pre-wrap;font-family:inherit;font-size:13.5px;background:#fafbfd;padding:14px;border-radius:10px">${MANUAL_EQUIPO_SEGURIDAD}</pre>
    <h4 style="margin-top:16px">Bitácora de revisiones</h4>
    <div class="toolbar no-print">${isAdmin()?'<button class="btn small secondary" onclick="abrirFormRevision()">+ Registrar revisión</button>':''}</div>
    <table><tr><th>Fecha</th><th>Lugar</th><th>Tipo</th><th>Recomendación</th>${isAdmin()?'<th></th>':''}</tr>
    ${DATA.equipoRevisiones.map(r=>`<tr><td>${r.fecha||'—'}</td><td>${r.lugar}</td><td>${r.tipo}</td><td>${r.recomendacion}</td>
      ${isAdmin()?`<td><button class="btn small danger" onclick="eliminarRevision('${r.id}')">Eliminar</button></td>`:''}</tr>`).join('') || `<tr><td colspan="5" class="muted">Sin revisiones registradas.</td></tr>`}
    </table>
  </div>
  <div class="card">
    <h3>📍 Teléfonos de emergencia — Quito, Ibarra y Ecuador</h3>
    <table><tr><th>Zona</th><th>Servicio</th><th>Teléfono</th></tr>
    ${EMERGENCIA_EC.map(e=>`<tr><td>${e.zona}</td><td>${e.servicio}</td><td><b>${e.tel}</b></td></tr>`).join('')}
    </table>
  </div>`;
  document.getElementById('planesContainer').innerHTML = DATA.planes.map(p=>`
    <div class="card">
      <h3>🛡️ ${p.tipo}</h3>
      <pre style="white-space:pre-wrap;font-family:inherit;font-size:13px">${p.contenido}</pre>
      ${isAdmin()?`<div class="no-print"><button class="btn small secondary" onclick="abrirFormPlan('${p.id}')">Editar</button> <button class="btn small danger" onclick="eliminarPlan('${p.id}')">Eliminar</button></div>`:''}
    </div>`).join('');
}
window.abrirFormPlan = function(id){
  if(!requireAdmin()) return;
  const p = id? DATA.planes.find(x=>x.id===id): {tipo:'',contenido:''};
  openModal(id?'Editar plan de contingencia':'Nuevo plan de contingencia', `
    <label>Tipo de riesgo</label><input name="tipo" required value="${p.tipo}">
    <label>Contenido del plan (Antes / Durante / Después)</label><textarea name="contenido" rows="8" required>${p.contenido}</textarea>`,
    async (fd)=>{
      const item={id, tipo:fd.get('tipo'), contenido:fd.get('contenido')};
      const newId = await guardarDoc('planesSeguridad', item);
      if(!id){item.id=newId; DATA.planes.push(item);} else Object.assign(p,item);
      render('seguridad');
    });
};
window.eliminarPlan = async function(id){ if(!requireAdmin())return; if(!confirm('¿Eliminar plan?'))return; await borrarDoc('planesSeguridad',id); DATA.planes=DATA.planes.filter(p=>p.id!==id); render('seguridad'); };
window.abrirFormRevision = function(){
  if(!requireAdmin()) return;
  openModal('Registrar revisión de seguridad', `
    <label>Lugar</label><select name="tipo">${opciones(['Vivienda','Escuela','Trabajo','Vehículo'])}</select>
    <label>Descripción del lugar</label><input name="lugar" required placeholder="Ej: Casa principal, Quito">
    <label>Fecha</label><input type="date" name="fecha">
    <label>Recomendación / zonas seguras identificadas</label><textarea name="recomendacion" rows="3" required></textarea>`,
    async (fd)=>{
      const item={tipo:fd.get('tipo'), lugar:fd.get('lugar'), fecha:fd.get('fecha'), recomendacion:fd.get('recomendacion')};
      item.id = await guardarDoc('revisionesSeguridad', item);
      DATA.equipoRevisiones.push(item);
      render('seguridad');
    });
};
window.eliminarRevision = async function(id){ if(!requireAdmin())return; await borrarDoc('revisionesSeguridad',id); DATA.equipoRevisiones=DATA.equipoRevisiones.filter(r=>r.id!==id); render('seguridad'); };

/* =========================================================================
   4) FONDOS DE CONTINGENCIA
   ========================================================================= */
function renderFondos(){
  const saldo = calcularSaldoFondos();
  const porRubro = {};
  (DATA.fondos.gastos||[]).forEach(g=>{ porRubro[g.rubro]=(porRubro[g.rubro]||0)+(parseFloat(g.monto)||0); });
  document.getElementById('content').innerHTML = `
  ${topbar('Fondos de contingencia', 'Aportes, gastos y saldo del fondo familiar',
    isAdmin()? '<button class="btn secondary" onclick="abrirFormAporte()">+ Aporte</button> <button class="btn secondary" onclick="abrirFormGasto()">+ Gasto</button> <button class="btn secondary" onclick="abrirFormConvenio()">+ Convenio mensual</button> <button class="btn" onclick="editarBanco()">🏦 Datos bancarios</button>':'')}
  <div class="grid cols-3">
    <div class="card"><div class="muted">Saldo actual</div><h2>${money(saldo)}</h2></div>
    <div class="card"><div class="muted">Total aportado</div><h2>${money((DATA.fondos.aportes||[]).reduce((s,a)=>s+(parseFloat(a.monto)||0),0))}</h2></div>
    <div class="card"><div class="muted">Total gastado</div><h2>${money((DATA.fondos.gastos||[]).reduce((s,g)=>s+(parseFloat(g.monto)||0),0))}</h2></div>
  </div>
  <div class="card"><b>Depositado en:</b> ${DATA.fondos.banco||'No especificado'}</div>
  <div class="grid cols-2">
    <div class="card"><h3>Aportes por grupo familiar</h3>
      <table><tr><th>Grupo</th><th>Monto</th><th>Fecha</th>${isAdmin()?'<th></th>':''}</tr>
      ${(DATA.fondos.aportes||[]).map((a,i)=>`<tr><td>${nombreFamilia(a.familiaId)}</td><td>${money(a.monto)}</td><td>${a.fecha||'—'}</td>${isAdmin()?`<td><button class="btn small danger" onclick="eliminarAporte(${i})">✕</button></td>`:''}</tr>`).join('')||'<tr><td colspan="4" class="muted">Sin aportes.</td></tr>'}
      </table>
    </div>
    <div class="card"><h3>Gastos por rubro</h3>
      <table><tr><th>Rubro</th><th>Total</th></tr>
      ${Object.keys(porRubro).map(r=>`<tr><td>${r}</td><td>${money(porRubro[r])}</td></tr>`).join('')||'<tr><td colspan="2" class="muted">Sin gastos.</td></tr>'}
      </table>
    </div>
  </div>
  <div class="card"><h3>Detalle de gastos</h3>
    <table><tr><th>Rubro</th><th>Monto</th><th>Ubicación</th><th>Detalle</th><th>Fecha</th>${isAdmin()?'<th></th>':''}</tr>
    ${(DATA.fondos.gastos||[]).map((g,i)=>`<tr><td>${g.rubro}</td><td>${money(g.monto)}</td><td>${g.ubicacion||'—'}</td><td>${g.detalle||'—'}</td><td>${g.fecha||'—'}</td>${isAdmin()?`<td><button class="btn small danger" onclick="eliminarGasto(${i})">✕</button></td>`:''}</tr>`).join('')||'<tr><td colspan="6" class="muted">Sin gastos.</td></tr>'}
    </table>
  </div>
  <div class="card"><h3>Convenios de cuotas mensuales</h3>
    <table><tr><th>Grupo familiar</th><th>Monto mensual</th><th>Día de pago</th>${isAdmin()?'<th></th>':''}</tr>
    ${(DATA.fondos.convenios||[]).map((c,i)=>`<tr><td>${nombreFamilia(c.familiaId)}</td><td>${money(c.monto)}</td><td>${c.dia||'—'}</td>${isAdmin()?`<td><button class="btn small danger" onclick="eliminarConvenio(${i})">✕</button></td>`:''}</tr>`).join('')||'<tr><td colspan="4" class="muted">Sin convenios.</td></tr>'}
    </table>
  </div>`;
}
window.abrirFormAporte = function(){ if(!requireAdmin())return; openModal('Registrar aporte', `
  <label>Grupo familiar</label><select name="familiaId">${opcionesFamilias()}</select>
  <label>Monto</label><input type="number" step="0.01" name="monto" required>
  <label>Fecha</label><input type="date" name="fecha">`,
  async (fd)=>{ DATA.fondos.aportes=DATA.fondos.aportes||[]; DATA.fondos.aportes.push({familiaId:fd.get('familiaId'),monto:fd.get('monto'),fecha:fd.get('fecha')}); await guardarFondos(); render('fondos'); }); };
window.eliminarAporte = async function(i){ if(!requireAdmin())return; DATA.fondos.aportes.splice(i,1); await guardarFondos(); render('fondos'); };
window.abrirFormGasto = function(){ if(!requireAdmin())return; openModal('Registrar gasto', `
  <label>Rubro</label><select name="rubro">${opciones(['Alimentos','Vestimenta','Salud','Vivienda/reparación','Transporte','Educación','Otro'])}</select>
  <label>Monto</label><input type="number" step="0.01" name="monto" required>
  <label>Ubicación (si aplica)</label><input name="ubicacion">
  <label>Detalle</label><input name="detalle">
  <label>Fecha</label><input type="date" name="fecha">`,
  async (fd)=>{ DATA.fondos.gastos=DATA.fondos.gastos||[]; DATA.fondos.gastos.push({rubro:fd.get('rubro'),monto:fd.get('monto'),ubicacion:fd.get('ubicacion'),detalle:fd.get('detalle'),fecha:fd.get('fecha')}); await guardarFondos(); render('fondos'); }); };
window.eliminarGasto = async function(i){ if(!requireAdmin())return; DATA.fondos.gastos.splice(i,1); await guardarFondos(); render('fondos'); };
window.abrirFormConvenio = function(){ if(!requireAdmin())return; openModal('Nuevo convenio de cuota mensual', `
  <label>Grupo familiar</label><select name="familiaId">${opcionesFamilias()}</select>
  <label>Monto mensual</label><input type="number" step="0.01" name="monto" required>
  <label>Día de pago</label><input name="dia" placeholder="Ej: día 5 de cada mes">`,
  async (fd)=>{ DATA.fondos.convenios=DATA.fondos.convenios||[]; DATA.fondos.convenios.push({familiaId:fd.get('familiaId'),monto:fd.get('monto'),dia:fd.get('dia')}); await guardarFondos(); render('fondos'); }); };
window.eliminarConvenio = async function(i){ if(!requireAdmin())return; DATA.fondos.convenios.splice(i,1); await guardarFondos(); render('fondos'); };
window.editarBanco = function(){ if(!requireAdmin())return; openModal('Datos bancarios / dónde está depositado el fondo', `
  <label>Descripción (banco, tipo de cuenta, etc.)</label><textarea name="banco" rows="3">${DATA.fondos.banco||''}</textarea>`,
  async (fd)=>{ DATA.fondos.banco=fd.get('banco'); await guardarFondos(); render('fondos'); }); };

/* =========================================================================
   5) SEGUROS
   ========================================================================= */
function renderSeguros(){
  document.getElementById('content').innerHTML = `
  ${topbar('Seguros', 'Pólizas del grupo familiar y recomendaciones', isAdmin()?'<button class="btn" onclick="abrirFormSeguro()">+ Nuevo seguro</button>':'')}
  <div class="card"><h3>📎 Recomendaciones sobre qué seguros contratar</h3>
  <pre style="white-space:pre-wrap;font-family:inherit;font-size:13.5px">${REC_SEGUROS}</pre></div>
  <div class="grid cols-2" id="segurosContainer"></div>`;
  document.getElementById('segurosContainer').innerHTML = DATA.seguros.map(s=>`
    <div class="card">
      <h3>${s.tipo} <span class="pill" style="margin-left:6px">${nombreFamilia(s.familiaId)}</span></h3>
      <table>
        <tr><td class="muted">Aseguradora</td><td>${s.aseguradora||'—'}</td></tr>
        <tr><td class="muted">Vigencia</td><td>${s.vigencia||'—'}</td></tr>
        <tr><td class="muted">Respaldo</td><td>${s.enlace? `<a href="${s.enlace}" target="_blank">Ver en OneDrive ↗</a>`:'—'}</td></tr>
      </table>
      ${isAdmin()?`<div class="no-print"><button class="btn small secondary" onclick="abrirFormSeguro('${s.id}')">Editar</button> <button class="btn small danger" onclick="eliminarSeguro('${s.id}')">Eliminar</button></div>`:''}
    </div>`).join('') || '<p class="muted">Sin pólizas registradas.</p>';
}
window.abrirFormSeguro = function(id){
  if(!requireAdmin()) return;
  const s = id? DATA.seguros.find(x=>x.id===id): {};
  openModal(id?'Editar seguro':'Nuevo seguro', `
    <label>Grupo familiar</label><select name="familiaId">${opcionesFamilias(s.familiaId)}</select>
    <label>Tipo de seguro</label><select name="tipo">${opciones(['Vida','Salud/Médico','Vehicular','Hogar','Accidentes personales','Otro'], s.tipo)}</select>
    <label>Aseguradora</label><input name="aseguradora" value="${s.aseguradora||''}">
    <label>Vigencia</label><input name="vigencia" placeholder="Ej: hasta 12/2026" value="${s.vigencia||''}">
    <label>Enlace de respaldo (OneDrive)</label><input name="enlace" placeholder="https://onedrive.live.com/..." value="${s.enlace||''}">`,
    async (fd)=>{
      const item={id, familiaId:fd.get('familiaId'), tipo:fd.get('tipo'), aseguradora:fd.get('aseguradora'), vigencia:fd.get('vigencia'), enlace:fd.get('enlace')};
      const newId = await guardarDoc('seguros', item);
      if(!id){item.id=newId; DATA.seguros.push(item);} else Object.assign(s,item);
      render('seguros');
    });
};
window.eliminarSeguro = async function(id){ if(!requireAdmin())return; if(!confirm('¿Eliminar seguro?'))return; await borrarDoc('seguros',id); DATA.seguros=DATA.seguros.filter(s=>s.id!==id); render('seguros'); };

/* =========================================================================
   6) TELÉFONOS DE CONTACTO
   ========================================================================= */
function renderTelefonos(){
  document.getElementById('content').innerHTML = `
  ${topbar('Teléfonos de contacto', 'Pariente, amigo, trabajo — por persona y por grupo familiar', isAdmin()?'<button class="btn" onclick="abrirFormTelefono()">+ Nuevo teléfono</button>':'')}
  <div class="card"><table><tr><th>Nombre</th><th>Relación</th><th>Teléfono</th><th>Ciudad</th><th>Grupo familiar</th>${isAdmin()?'<th></th>':''}</tr>
  ${DATA.telefonos.map(t=>`<tr><td>${t.nombre}</td><td>${t.relacion}</td><td>${t.telefono}</td><td>${t.ciudad}</td><td>${nombreFamilia(t.familiaId)}</td>
    ${isAdmin()?`<td><button class="btn small secondary" onclick="abrirFormTelefono('${t.id}')">Editar</button> <button class="btn small danger" onclick="eliminarTelefono('${t.id}')">✕</button></td>`:''}</tr>`).join('') || `<tr><td colspan="6" class="muted">Sin registros.</td></tr>`}
  </table></div>`;
}
window.abrirFormTelefono = function(id){
  const t = id? DATA.telefonos.find(x=>x.id===id): {};
  openModal(id?'Editar teléfono':'Nuevo teléfono de contacto', `
    <label>Nombre</label><input name="nombre" required value="${t.nombre||''}">
    <label>Relación</label><select name="relacion">${opciones(['Pariente','Amigo','Trabajo','Otro'], t.relacion)}</select>
    <label>Teléfono</label><input name="telefono" required value="${t.telefono||''}">
    <label>Ciudad (Ecuador)</label><select name="ciudad">${opciones(CIUDADES_EC, t.ciudad)}</select>
    <label>Grupo familiar</label><select name="familiaId">${opcionesFamilias(t.familiaId)}</select>`,
    async (fd)=>{
      const item={id, nombre:fd.get('nombre'), relacion:fd.get('relacion'), telefono:fd.get('telefono'), ciudad:fd.get('ciudad'), familiaId:fd.get('familiaId')};
      const newId = await guardarDoc('telefonos', item);
      if(!id){item.id=newId; DATA.telefonos.push(item);} else Object.assign(t,item);
      render('telefonos');
    });
};
window.eliminarTelefono = async function(id){ if(!requireAdmin())return; await borrarDoc('telefonos',id); DATA.telefonos=DATA.telefonos.filter(t=>t.id!==id); render('telefonos'); };

/* =========================================================================
   7) CUMPLEAÑOS
   ========================================================================= */
function renderCumpleanos(){
  const lista = [...DATA.miembros].filter(m=>m.fechaNacimiento).sort((a,b)=>diasHastaCumple(a.fechaNacimiento)-diasHastaCumple(b.fechaNacimiento));
  document.getElementById('content').innerHTML = `
  ${topbar('Cumpleaños', 'Fechas de todo el grupo familiar')}
  <div class="card"><table><tr><th>Miembro</th><th>Grupo</th><th>Fecha</th><th>Cumple años</th><th>Faltan</th><th class="no-print">Mensaje</th></tr>
  ${lista.map(m=>`<tr><td>${m.nombre}</td><td>${nombreFamilia(m.familiaId)}</td><td>${fmtFecha(m.fechaNacimiento)}</td><td>${edadDesde(m.fechaNacimiento)+ (diasHastaCumple(m.fechaNacimiento)===0?0:1)} años</td><td>${diasHastaCumple(m.fechaNacimiento)===0?'¡Hoy! 🎉':diasHastaCumple(m.fechaNacimiento)+' días'}</td>
    <td class="no-print"><button class="btn small gold" onclick="mensajeCumple('${m.id}')">💬 WhatsApp</button></td></tr>`).join('') || `<tr><td colspan="6" class="muted">Sin fechas registradas.</td></tr>`}
  </table></div>`;
}
window.mensajeCumple = function(id){
  const m = DATA.miembros.find(x=>x.id===id);
  const edad = edadDesde(m.fechaNacimiento)+1;
  const msg = `🎉✨ ¡Feliz cumpleaños, ${m.nombre.split(' ')[0]}! ✨🎉\n\nHoy celebramos ${edad} años de tu vida y damos gracias a Dios por tantas bendiciones a través de ti. Que este nuevo año esté lleno de salud, sabiduría y momentos inolvidables junto a la familia.\n\n"Dame a conocer, oh Jehová, mi fin, y cuánta sea la medida de mis días; sepa yo cuán frágil soy." — Salmos 39:4\n\nCon todo el cariño de tu familia. ¡Te queremos mucho! 🎂🎈`;
  openModal('Mensaje de cumpleaños para '+m.nombre, `<textarea rows="10" readonly>${msg}</textarea>
    <p class="muted" style="margin-top:8px">Copia el mensaje o envíalo directo por WhatsApp:</p>
    <a class="btn" style="display:inline-block;text-decoration:none;margin-top:6px" target="_blank" href="https://wa.me/?text=${encodeURIComponent(msg)}">Abrir en WhatsApp</a>`, async ()=>{});
};

/* =========================================================================
   8) ESTRUCTURAS
   ========================================================================= */
function renderEstructuras(){
  document.getElementById('content').innerHTML = `
  ${topbar('Estructuras', 'Bienes del grupo familiar, estado y planes de resolución', isAdmin()?'<button class="btn" onclick="abrirFormBien()">+ Nuevo bien</button>':'')}
  <div id="estructurasContainer"></div>`;
  document.getElementById('estructurasContainer').innerHTML = DATA.estructuras.map(b=>{
    const plan = b.plan||[];
    const avance = plan.length? Math.round(plan.reduce((s,p)=>s+(parseInt(p.avance)||0),0)/plan.length) : 0;
    return `<div class="card">
      <div style="display:flex;justify-content:space-between">
        <h3>🏗️ ${b.nombre} <span class="pill" style="margin-left:6px">${nombreFamilia(b.familiaId)}</span></h3>
        <span class="pill ${b.estado==='Con problemas'?'danger':''}">${b.estado}</span>
      </div>
      ${b.problemas? `<p><b>Problema:</b> ${b.problemas}</p><p class="muted"><b>Recomendación (IA):</b> ${recomendacionEstructura(b.problemas)}</p>`:''}
      <div class="muted" style="margin-top:8px">Avance del plan de resolución</div>
      <div class="progress-bar"><div class="progress-fill" style="width:${avance}%"></div></div>
      <div class="muted" style="font-size:12px;margin-top:4px">${avance}% completado</div>
      <table style="margin-top:10px"><tr><th>Punto</th><th>Fecha límite</th><th>Avance</th>${isAdmin()?'<th></th>':''}</tr>
      ${plan.map((p,i)=>`<tr><td>${p.punto}</td><td>${p.fecha||'—'}</td><td>${p.avance||0}%</td>${isAdmin()?`<td><button class="btn small danger" onclick="eliminarPuntoPlan('${b.id}',${i})">✕</button></td>`:''}</tr>`).join('')||'<tr><td colspan="4" class="muted">Sin puntos de plan.</td></tr>'}
      </table>
      <div class="no-print" style="margin-top:8px">
        ${isAdmin()?`<button class="btn small secondary" onclick="abrirFormBien('${b.id}')">Editar bien</button> <button class="btn small secondary" onclick="abrirFormPuntoPlan('${b.id}')">+ Punto de plan</button> <button class="btn small danger" onclick="eliminarBien('${b.id}')">Eliminar</button>`:''}
      </div>
    </div>`;
  }).join('') || '<p class="muted">Sin bienes registrados.</p>';
}
window.abrirFormBien = function(id){
  if(!requireAdmin()) return;
  const b = id? DATA.estructuras.find(x=>x.id===id): {plan:[]};
  openModal(id?'Editar bien':'Nuevo bien / estructura', `
    <label>Grupo familiar</label><select name="familiaId">${opcionesFamilias(b.familiaId)}</select>
    <label>Nombre del bien</label><input name="nombre" required value="${b.nombre||''}" placeholder="Ej: Casa principal, Vehículo...">
    <label>Estado</label><select name="estado">${opciones(['Bueno','Regular','Con problemas'], b.estado)}</select>
    <label>Descripción del problema (si aplica)</label><textarea name="problemas" rows="2">${b.problemas||''}</textarea>`,
    async (fd)=>{
      const item={id, familiaId:fd.get('familiaId'), nombre:fd.get('nombre'), estado:fd.get('estado'), problemas:fd.get('problemas'), plan:b.plan||[]};
      const newId = await guardarDoc('estructuras', item);
      if(!id){item.id=newId; DATA.estructuras.push(item);} else Object.assign(b,item);
      render('estructuras');
    });
};
window.eliminarBien = async function(id){ if(!requireAdmin())return; if(!confirm('¿Eliminar bien?'))return; await borrarDoc('estructuras',id); DATA.estructuras=DATA.estructuras.filter(b=>b.id!==id); render('estructuras'); };
window.abrirFormPuntoPlan = function(bienId){
  if(!requireAdmin()) return;
  const b = DATA.estructuras.find(x=>x.id===bienId);
  openModal('Nuevo punto del plan de resolución', `
    <label>Punto / acción</label><input name="punto" required>
    <label>Fecha límite</label><input type="date" name="fecha">
    <label>Avance (%)</label><input type="number" name="avance" min="0" max="100" value="0">`,
    async (fd)=>{
      b.plan = b.plan||[];
      b.plan.push({punto:fd.get('punto'), fecha:fd.get('fecha'), avance:fd.get('avance')});
      await guardarDoc('estructuras', b);
      render('estructuras');
    });
};
window.eliminarPuntoPlan = async function(bienId, idx){ if(!requireAdmin())return; const b=DATA.estructuras.find(x=>x.id===bienId); b.plan.splice(idx,1); await guardarDoc('estructuras', b); render('estructuras'); };

/* =========================================================================
   9) DIVERSIÓN
   ========================================================================= */
function renderDiversion(){
  document.getElementById('content').innerHTML = `
  ${topbar('Diversión', 'Propuestas de paseos, reuniones y encuestas familiares', '<button class="btn" onclick="abrirFormPropuesta()">+ Nueva propuesta</button>')}
  <div id="propuestasContainer"></div>`;
  document.getElementById('propuestasContainer').innerHTML = DATA.diversionPropuestas.map(p=>{
    const resp = DATA.diversionRespuestas.filter(r=>r.propuestaId===p.id);
    const si = resp.filter(r=>r.respuesta==='Sí').length, no = resp.filter(r=>r.respuesta==='No').length;
    const rec = recomendacionViaje();
    return `<div class="card">
      <div style="display:flex;justify-content:space-between"><h3>🎉 ${p.titulo}</h3><span class="pill">${p.tipo}</span></div>
      <p class="muted">Propone: ${p.proponente} ${p.motivo? '· Motivo: '+p.motivo:''} ${p.fecha? '· Fecha: '+p.fecha:''}</p>
      <div class="tag-row"><span class="pill">👍 ${si} sí</span><span class="pill">👎 ${no} no</span></div>
      <div class="no-print" style="margin-top:8px">
        <button class="btn small secondary" onclick="abrirFormRespuesta('${p.id}')">Responder encuesta</button>
        ${isAdmin()?`<button class="btn small danger" onclick="eliminarPropuesta('${p.id}')">Eliminar</button>`:''}
      </div>
      ${resp.length? `<table style="margin-top:10px"><tr><th>Miembro</th><th>Respuesta</th><th>Observación</th></tr>
        ${resp.map(r=>`<tr><td>${(DATA.miembros.find(m=>m.id===r.miembroId)||{}).nombre||r.miembroNombre||'—'}</td><td>${r.respuesta}</td><td>${r.observacion||'—'}</td></tr>`).join('')}</table>`:''}
      ${p.confirmado? `<div class="card" style="background:var(--teal-light);margin-top:10px">
        <b>✅ Paseo confirmado</b>
        <p><b>Qué llevar:</b> ${rec.llevar.join(', ')}</p>
        <p><b>Presupuesto:</b> ${rec.presupuesto}</p>
        <p><b>Cómo gastar menos:</b> ${rec.ahorrar.join(' · ')}</p>
      </div>` : `<div class="no-print">${isAdmin()?`<button class="btn small gold" style="margin-top:8px" onclick="confirmarPaseo('${p.id}')">Confirmar paseo</button>`:''}</div>`}
    </div>`;
  }).join('') || '<p class="muted">Sin propuestas aún.</p>';
}
window.abrirFormPropuesta = function(){
  openModal('Nueva propuesta de diversión', `
    <label>Título</label><input name="titulo" required placeholder="Ej: Paseo a Mindo">
    <label>Tipo</label><select name="tipo">${opciones(['Paseo','Reunión en casa','Otro'])}</select>
    <label>¿Quién propone?</label><input name="proponente" required value="${CURRENT_USER.nombre||''}">
    <label>Motivo (opcional)</label><input name="motivo">
    <label>Fecha tentativa</label><input type="date" name="fecha">`,
    async (fd)=>{
      const item={titulo:fd.get('titulo'), tipo:fd.get('tipo'), proponente:fd.get('proponente'), motivo:fd.get('motivo'), fecha:fd.get('fecha'), confirmado:false};
      item.id = await guardarDoc('diversionPropuestas', item);
      DATA.diversionPropuestas.push(item);
      render('diversion');
    });
};
window.eliminarPropuesta = async function(id){ if(!requireAdmin())return; await borrarDoc('diversionPropuestas',id); DATA.diversionPropuestas=DATA.diversionPropuestas.filter(p=>p.id!==id); render('diversion'); };
window.abrirFormRespuesta = function(propuestaId){
  openModal('Responder encuesta', `
    <label>Miembro</label><select name="miembroId">${DATA.miembros.map(m=>`<option value="${m.id}">${m.nombre}</option>`).join('')}</select>
    <label>¿Deseas ir?</label><select name="respuesta">${opciones(['Sí','No'])}</select>
    <label>Observación (por qué)</label><input name="observacion">`,
    async (fd)=>{
      const item={propuestaId, miembroId:fd.get('miembroId'), respuesta:fd.get('respuesta'), observacion:fd.get('observacion')};
      item.id = await guardarDoc('diversionRespuestas', item);
      DATA.diversionRespuestas.push(item);
      render('diversion');
    });
};
window.confirmarPaseo = async function(id){
  if(!requireAdmin())return;
  const p = DATA.diversionPropuestas.find(x=>x.id===id); p.confirmado=true;
  await guardarDoc('diversionPropuestas', p);
  render('diversion');
};

/* =========================================================================
   10) PLANIFICACIÓN (informes ejecutivos por área)
   ========================================================================= */
function renderPlanificacion(){
  document.getElementById('content').innerHTML = `
  ${topbar('Planificación', 'Informe ejecutivo consolidado del plan familiar')}
  <div class="card">
    <h3>Resumen ejecutivo</h3>
    <table>
      <tr><td>Grupos familiares</td><td><b>${DATA.familias.length}</b></td></tr>
      <tr><td>Miembros registrados</td><td><b>${DATA.miembros.length}</b></td></tr>
      <tr><td>Planes de seguridad activos</td><td><b>${DATA.planes.length}</b></td></tr>
      <tr><td>Pólizas de seguros</td><td><b>${DATA.seguros.length}</b></td></tr>
      <tr><td>Bienes/estructuras registrados</td><td><b>${DATA.estructuras.length}</b></td></tr>
      <tr><td>Saldo del fondo de contingencia</td><td><b>${money(calcularSaldoFondos())}</b></td></tr>
      <tr><td>Propuestas de diversión activas</td><td><b>${DATA.diversionPropuestas.length}</b></td></tr>
      <tr><td>Ideas registradas</td><td><b>${DATA.ideas.length}</b></td></tr>
    </table>
    <p class="muted" style="margin-top:12px">Usa "Imprimir / Exportar" en cada área (Grupo familiar, Seguridad, Fondos, Seguros, Estructuras, Salud, etc.) para generar el informe ejecutivo específico de esa sección en PDF.</p>
    <button class="btn no-print" onclick="window.print()">🖨️ Imprimir este resumen</button>
  </div>`;
}

/* =========================================================================
   11) SALUD
   ========================================================================= */
function renderSalud(){
  document.getElementById('content').innerHTML = `
  ${topbar('Salud', 'Enfermedades, medicamentos, alergias y planificación médica', isAdmin()?'<button class="btn" onclick="abrirFormSalud()">+ Registro de salud</button>':'')}
  <div id="saludContainer"></div>`;
  document.getElementById('saludContainer').innerHTML = DATA.miembros.map(m=>{
    const registros = DATA.salud.filter(s=>s.miembroId===m.id);
    const citas = citasPorEdad(edadDesde(m.fechaNacimiento)||0);
    return `<div class="card">
      <h3>🩺 ${m.nombre} <span class="pill" style="margin-left:6px">${edadDesde(m.fechaNacimiento)} años</span></h3>
      <p><b>Alergias (de su ficha):</b> ${m.alergias||'Ninguna registrada'}</p>
      ${registros.length? registros.map(r=>`<div style="background:#fafbfd;padding:10px;border-radius:8px;margin-bottom:8px">
        <p><b>Enfermedad/condición:</b> ${r.enfermedad}</p>
        <p><b>Medicamento actual:</b> ${r.medicamento||'—'}</p>
        <p class="muted"><b>Recomendación (IA):</b> ${recomendacionMedica(r.enfermedad)}</p>
        ${isAdmin()?`<button class="btn small danger" onclick="eliminarSalud('${r.id}')">Eliminar</button>`:''}
        </div>`).join('') : '<p class="muted">Sin condiciones registradas.</p>'}
      <details style="margin-top:8px"><summary class="muted" style="cursor:pointer">📅 Planificación anual de citas médicas recomendadas</summary>
        <table style="margin-top:6px"><tr><th>Tipo de cita</th><th>Frecuencia</th></tr>
        ${citas.map(c=>`<tr><td>${c.tipo}</td><td>${c.frecuencia}</td></tr>`).join('')}</table>
      </details>
    </div>`;
  }).join('') || '<p class="muted">Registra primero miembros en Grupo familiar.</p>';
  document.getElementById('content').insertAdjacentHTML('beforeend', `<div class="card">
    <h3>🥗 Recomendación general de alimentación saludable (IA)</h3>
    <p>Priorizar frutas y verduras frescas de temporada, proteína magra (pollo, pescado, legumbres), granos enteros y abundante agua. Reducir azúcares refinados, frituras y comida ultraprocesada. Planificar el menú semanal en familia ayuda a mantener hábitos consistentes.</p>
  </div>`);
}
window.abrirFormSalud = function(){
  if(!requireAdmin()) return;
  openModal('Nuevo registro de salud', `
    <label>Miembro</label><select name="miembroId">${DATA.miembros.map(m=>`<option value="${m.id}">${m.nombre}</option>`).join('')}</select>
    <label>Enfermedad / condición</label><input name="enfermedad" required>
    <label>Medicamento que toma</label><input name="medicamento">`,
    async (fd)=>{
      const item={miembroId:fd.get('miembroId'), enfermedad:fd.get('enfermedad'), medicamento:fd.get('medicamento')};
      item.id = await guardarDoc('salud', item);
      DATA.salud.push(item);
      render('salud');
    });
};
window.eliminarSalud = async function(id){ if(!requireAdmin())return; await borrarDoc('salud',id); DATA.salud=DATA.salud.filter(s=>s.id!==id); render('salud'); };

/* =========================================================================
   12) IDEAS
   ========================================================================= */
function renderIdeas(){
  document.getElementById('content').innerHTML = `
  ${topbar('Ideas', 'Ideas de los miembros y generador de ideas por tema', '<button class="btn" onclick="abrirFormIdea()">+ Nueva idea</button> <button class="btn secondary" onclick="abrirGeneradorIdeas()">✨ Generar ideas con IA</button>')}
  <div class="card"><table><tr><th>Miembro</th><th>Tema</th><th>Idea</th>${isAdmin()?'<th></th>':''}</tr>
  ${DATA.ideas.map(i=>`<tr><td>${(DATA.miembros.find(m=>m.id===i.miembroId)||{}).nombre||i.autor||'—'}</td><td>${i.tema}</td><td>${i.idea}</td>
    ${isAdmin()?`<td><button class="btn small danger" onclick="eliminarIdea('${i.id}')">✕</button></td>`:''}</tr>`).join('') || `<tr><td colspan="4" class="muted">Sin ideas registradas.</td></tr>`}
  </table></div>`;
}
window.abrirFormIdea = function(){
  openModal('Nueva idea', `
    <label>Miembro</label><select name="miembroId">${DATA.miembros.map(m=>`<option value="${m.id}">${m.nombre}</option>`).join('')}</select>
    <label>Tema</label><input name="tema" required placeholder="Ej: paseo, ahorro, salud...">
    <label>Idea</label><textarea name="idea" rows="3" required></textarea>`,
    async (fd)=>{
      const item={miembroId:fd.get('miembroId'), tema:fd.get('tema'), idea:fd.get('idea')};
      item.id = await guardarDoc('ideas', item);
      DATA.ideas.push(item);
      render('ideas');
    });
};
window.eliminarIdea = async function(id){ if(!requireAdmin())return; await borrarDoc('ideas',id); DATA.ideas=DATA.ideas.filter(i=>i.id!==id); render('ideas'); };
window.abrirGeneradorIdeas = function(){
  openModal('Generar ideas con IA (motor de recomendaciones)', `
    <label>Tema</label><input name="tema" required placeholder="Ej: paseo, ahorro, aprendizaje, salud, convivencia...">
    <div id="ideasGeneradas" class="muted" style="margin-top:10px"></div>`,
    async (fd)=>{
      // el submit no hace nada; el botón de abajo genera
    });
  // reemplazamos el submit para mostrar ideas en vivo
  const form = document.getElementById('modalForm');
  const btn = form.querySelector('button[type=submit]');
  btn.textContent='Generar';
  form.onsubmit = (e)=>{
    e.preventDefault();
    const tema = form.tema.value;
    const ideas = generarIdeas(tema);
    document.getElementById('ideasGeneradas').innerHTML = '<b>Ideas sugeridas:</b><ul>'+ideas.map(i=>`<li>${i} <button type="button" class="btn small secondary" onclick="guardarIdeaGenerada('${tema.replace(/'/g,"")}', '${i.replace(/'/g,"")}')">Guardar</button></li>`).join('')+'</ul>';
  };
};
window.guardarIdeaGenerada = async function(tema, idea){
  const item={tema, idea, autor:'Generador IA'};
  item.id = await guardarDoc('ideas', item);
  DATA.ideas.push(item);
  alert('Idea guardada en el listado.');
  render('ideas');
};

/* =========================================================================
   13) GESTIÓN DE ACCESOS (solo admin) — crea usuario+contraseña y su perfil en Firestore automáticamente
   ========================================================================= */
let LISTA_ACCESOS = [];
async function cargarAccesos(){
  const snap = await db.collection('usuarios').get();
  LISTA_ACCESOS = snap.docs.map(d=>({uid:d.id, ...d.data()}));
}
async function renderAccesos(){
  if(!isAdmin()){ render('dashboard'); return; }
  document.getElementById('content').innerHTML = `
  ${topbar('Gestión de accesos', 'Crea el usuario y contraseña de cada miembro; su perfil se registra automáticamente', '<button class="btn" onclick="abrirFormAcceso()">+ Nuevo acceso</button>')}
  <div class="card" id="accesosContainer"><p class="muted">Cargando...</p></div>`;
  await cargarAccesos();
  document.getElementById('accesosContainer').innerHTML = `
  <table><tr><th>Correo</th><th>Nombre</th><th>Rol</th><th>Miembro vinculado</th></tr>
  ${LISTA_ACCESOS.map(a=>`<tr><td>${a.email||'—'}</td><td>${a.nombre||'—'}</td><td><span class="pill ${a.rol==='admin'?'gold':''}">${a.rol==='admin'?'Administrador':'Miembro'}</span></td><td>${(DATA.miembros.find(m=>m.id===a.miembroId)||{}).nombre||'—'}</td></tr>`).join('') || '<tr><td colspan="4" class="muted">Sin accesos creados aún.</td></tr>'}
  </table>
  <p class="muted" style="margin-top:14px">Nota: por seguridad de Firebase, esta lista se arma a partir de los perfiles guardados en Firestore (no lista directamente Authentication). Los accesos que crees aquí sí quedan completos en ambos lugares.</p>`;
}
window.abrirFormAcceso = function(){
  if(!requireAdmin()) return;
  openModal('Nuevo acceso de miembro', `
    <label>Correo electrónico</label><input type="email" name="email" required placeholder="nombre@familia.com">
    <label>Contraseña (mínimo 6 caracteres)</label><input type="text" name="password" required minlength="6" placeholder="Contraseña temporal">
    <label>Nombre para mostrar</label><input name="nombre" required>
    <label>Rol</label><select name="rol">${opciones(['miembro','admin'])}</select>
    <label>Vincular a ficha de miembro (opcional)</label><select name="miembroId"><option value="">— ninguna —</option>${DATA.miembros.map(m=>`<option value="${m.id}">${m.nombre}</option>`).join('')}</select>
    <p class="muted" id="accesoError" style="color:var(--danger)"></p>`,
    async (fd)=>{
      const email=fd.get('email'), password=fd.get('password'), nombre=fd.get('nombre'), rol=fd.get('rol'), miembroId=fd.get('miembroId');
      try{
        const cred = await secondaryAuth.createUserWithEmailAndPassword(email, password);
        const newUid = cred.user.uid;
        await secondaryAuth.signOut();
        await db.collection('usuarios').doc(newUid).set({email, nombre, rol, miembroId: miembroId||null});
        alert('Acceso creado correctamente para '+email);
        render('accesos');
      }catch(err){
        alert('No se pudo crear el acceso: '+ (err.message||err));
      }
    });
};


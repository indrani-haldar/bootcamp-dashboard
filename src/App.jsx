import { useState } from "react";
import {
  BookOpen,
  Layers,
  Cloud,
  GitBranch,
  Server,
  Terminal,
  Flag,
  ChevronRight,
  ChevronDown,
  Boxes,
  Folder,
  FileCode,
  ShieldCheck,
  Zap,
  ListOrdered,
  Puzzle,
  FileText,
  Image,
} from "lucide-react";

const RED = "#EC1000";
const ACCENT_RED = "#FF0000";
const RED_DARK = "#B00D00";
const RED_DEEPER = "#8A0A00";
const RED_TINT = "#FDE7E5";
const RED_TINT_LINE = "#F5C2BC";
const INK = "#231F20";
const GRAY = "#6B6B6B";
const GRAY_LIGHT = "#F2F2F2";

/* ---------- shared diagram primitives ---------- */
function DBox({ x, y, w, h, label, sub, fill = "white", stroke = "#E2E2E2", labelColor = INK, subColor = GRAY, dashed = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="1.5" strokeDasharray={dashed ? "5 4" : "0"} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 8 : 0)} textAnchor="middle" dominantBaseline="middle"
        fontSize="12" fontWeight="700" fill={labelColor} fontFamily="Arial, sans-serif">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" dominantBaseline="middle"
          fontSize="9.2" fill={subColor} fontFamily="Arial, sans-serif">
          {sub}
        </text>
      )}
    </g>
  );
}
function Arrow({ x1, y1, x2, y2, label, dashed = false }) {
  const midX = (x1 + x2) / 2;
  return (
    <g>
      <path d={`M ${x1} ${y1} L ${x2} ${y2}`} fill="none" stroke={RED} strokeWidth="2"
        strokeDasharray={dashed ? "5 4" : "0"} markerEnd="url(#arrowhead)" />
      {label && (
        <text x={midX} y={y1 - 8} textAnchor="middle" fontSize="9.5" fontWeight="700" fill={RED_DARK} fontFamily="Arial, sans-serif">
          {label}
        </text>
      )}
    </g>
  );
}
function ArrowDefs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8 Z" fill={RED} />
      </marker>
    </defs>
  );
}

/* ---------- Module 1 diagrams ---------- */
function ArchitectureStackDiagram() {
  const layers = [
    { label: "AEM", sub: "Application Layer", fill: RED_TINT, stroke: RED_TINT_LINE, labelColor: RED_DARK },
    { label: "Apache Sling", sub: "Web Application Framework", fill: RED_TINT, stroke: RED_TINT_LINE, labelColor: RED_DARK },
    { label: "Apache Jackrabbit Oak", sub: "JCR Repository / Storage Layer", fill: RED_TINT, stroke: RED_TINT_LINE, labelColor: RED_DARK },
    { label: "Apache Felix", sub: "OSGi Java Container", fill: RED, stroke: RED_DARK, labelColor: "white", subColor: "rgba(255,255,255,0.85)" },
  ];
  const boxW = 560, boxH = 62, gap = 14, startY = 10, x = 110;
  return (
    <svg viewBox="0 0 780 300" className="w-full h-auto">
      <rect x={40} y={0} width={700} height={300} rx="22" fill={INK} />
      {layers.map((l, i) => (
        <DBox
          key={i}
          x={x}
          y={startY + i * (boxH + gap)}
          w={boxW}
          h={boxH}
          label={l.label}
          sub={l.sub}
          fill={l.fill}
          stroke={l.stroke}
          labelColor={l.labelColor}
          subColor={l.subColor}
        />
      ))}
    </svg>
  );
}
function CloudArchitectureDiagram() {
  const w = 170, h = 55;
  const rowX = [10, 200, 390, 580];
  return (
    <svg viewBox="0 0 780 190" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={rowX[0]} y={20} w={w} h={h} label="Developer" fill={GRAY_LIGHT} />
      <DBox x={rowX[1]} y={20} w={w} h={h} label="Git Repository" fill={GRAY_LIGHT} />
      <DBox x={rowX[2]} y={20} w={w} h={h} label="Cloud Manager" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={rowX[3]} y={20} w={w} h={h} label="Build → Test → Deploy" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={rowX[0] + w} y1={47.5} x2={rowX[1]} y2={47.5} />
      <Arrow x1={rowX[1] + w} y1={47.5} x2={rowX[2]} y2={47.5} />
      <Arrow x1={rowX[2] + w} y1={47.5} x2={rowX[3]} y2={47.5} />
      <Arrow x1={rowX[3] + w / 2} y1={75} x2={rowX[3] + w / 2} y2={110} />
      <DBox x={rowX[3]} y={110} w={w} h={h} label="Author" fill={GRAY_LIGHT} />
      <DBox x={rowX[2]} y={110} w={w} h={h} label="Publish" fill={GRAY_LIGHT} />
      <DBox x={rowX[1]} y={110} w={w} h={h} label="Dispatcher / CDN" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={rowX[0]} y={110} w={w} h={h} label="Website Users" fill={GRAY_LIGHT} />
      <Arrow x1={rowX[3]} y1={137.5} x2={rowX[2] + w} y2={137.5} />
      <Arrow x1={rowX[2]} y1={137.5} x2={rowX[1] + w} y2={137.5} />
      <Arrow x1={rowX[1]} y1={137.5} x2={rowX[0] + w} y2={137.5} />
    </svg>
  );
}
function APDArchitectureDiagram() {
  return (
    <svg viewBox="0 0 780 140" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={20} y={40} w={190} h={60} label="Author" sub="content authoring" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={210} y1={70} x2={280} y2={70} label="replication" />
      <DBox x={280} y={40} w={190} h={60} label="Publish" sub="serves live traffic" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={470} y1={70} x2={540} y2={70} />
      <DBox x={540} y={40} w={220} h={60} label="Dispatcher" sub="reverse proxy · cache · security" fill={GRAY_LIGHT} />
    </svg>
  );
}
function CicdDiagram() {
  const w = 155, h = 50;
  const xs = [10, 195, 380, 565];
  return (
    <svg viewBox="0 0 780 170" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={15} w={w} h={h} label="Developer" fill={GRAY_LIGHT} />
      <DBox x={xs[1]} y={15} w={w} h={h} label="Git Commit" fill={GRAY_LIGHT} />
      <DBox x={xs[2]} y={15} w={w} h={h} label="Cloud Manager Pipeline" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[3]} y={15} w={w} h={h} label="Build" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[0] + w} y1={40} x2={xs[1]} y2={40} />
      <Arrow x1={xs[1] + w} y1={40} x2={xs[2]} y2={40} />
      <Arrow x1={xs[2] + w} y1={40} x2={xs[3]} y2={40} />
      <Arrow x1={xs[3] + w / 2} y1={65} x2={xs[3] + w / 2} y2={100} />
      <DBox x={xs[3]} y={100} w={w} h={h} label="Quality Gates" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[2]} y={100} w={w} h={h} label="Security Scan" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[1]} y={100} w={w} h={h} label="Deploy: Dev → Stage" fill={GRAY_LIGHT} />
      <DBox x={xs[0]} y={100} w={w} h={h} label="Production" fill={GRAY_LIGHT} />
      <Arrow x1={xs[3]} y1={125} x2={xs[2] + w} y2={125} />
      <Arrow x1={xs[2]} y1={125} x2={xs[1] + w} y2={125} />
      <Arrow x1={xs[1]} y1={125} x2={xs[0] + w} y2={125} />
    </svg>
  );
}
function LocalSdkDiagram() {
  const w = 170, h = 46;
  const xs = [10, 200, 390, 580];
  return (
    <svg viewBox="0 0 780 260" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={10} w={w} h={h} label="Receive Requirement" fill={GRAY_LIGHT} />
      <DBox x={xs[1]} y={10} w={w} h={h} label="Design Component" fill={GRAY_LIGHT} />
      <DBox x={xs[2]} y={10} w={w} h={h} label="Implement Dialog" fill={GRAY_LIGHT} />
      <DBox x={xs[3]} y={10} w={w} h={h} label="Develop Sling Model" fill={GRAY_LIGHT} />
      <Arrow x1={xs[0] + w} y1={33} x2={xs[1]} y2={33} />
      <Arrow x1={xs[1] + w} y1={33} x2={xs[2]} y2={33} />
      <Arrow x1={xs[2] + w} y1={33} x2={xs[3]} y2={33} />
      <Arrow x1={xs[3] + w / 2} y1={56} x2={xs[3] + w / 2} y2={90} />
      <DBox x={xs[3]} y={90} w={w} h={h} label="Write HTL" fill={GRAY_LIGHT} />
      <DBox x={xs[2]} y={90} w={w} h={h} label="Add Client Libraries" fill={GRAY_LIGHT} />
      <DBox x={xs[1]} y={90} w={w} h={h} label="Deploy to Local SDK" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[0]} y={90} w={w} h={h} label="Author Content" fill={GRAY_LIGHT} />
      <Arrow x1={xs[3]} y1={113} x2={xs[2] + w} y2={113} />
      <Arrow x1={xs[2]} y1={113} x2={xs[1] + w} y2={113} />
      <Arrow x1={xs[1]} y1={113} x2={xs[0] + w} y2={113} />
      <Arrow x1={xs[0] + w / 2} y1={136} x2={xs[0] + w / 2} y2={170} />
      <DBox x={xs[0]} y={170} w={w} h={h} label="Test" fill={GRAY_LIGHT} />
      <DBox x={xs[1]} y={170} w={w} h={h} label="Commit Code" fill={GRAY_LIGHT} />
      <DBox x={xs[2]} y={170} w={w + 30} h={h} label="Cloud Manager Deployment" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[0] + w} y1={193} x2={xs[1]} y2={193} />
      <Arrow x1={xs[1] + w} y1={193} x2={xs[2]} y2={193} />
    </svg>
  );
}

/* ---------- Module 2 diagrams ---------- */
function SlingLifecycleDiagram() {
  const w = 175, h = 65;
  const xs = [10, 205, 400, 605];
  return (
    <svg viewBox="0 0 780 100" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={10} w={w} h={h} label="Request" fill={GRAY_LIGHT} />
      <DBox x={xs[1]} y={10} w={w} h={h} label="Resource Resolution" sub="type · selectors · extension · suffix" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[2]} y={10} w={w} h={h} label="HTL + Sling Model" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <DBox x={xs[3]} y={10} w={165} h={h} label="Rendered Response" fill={GRAY_LIGHT} />
      <Arrow x1={xs[0] + w} y1={42.5} x2={xs[1]} y2={42.5} />
      <Arrow x1={xs[1] + w} y1={42.5} x2={xs[2]} y2={42.5} />
      <Arrow x1={xs[2] + w} y1={42.5} x2={xs[3]} y2={42.5} />
    </svg>
  );
}
function ResourceResolutionDiagram() {
  const boxW = 220, h = 60;
  return (
    <svg viewBox="0 0 780 170" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={20} y={55} w={boxW} h={h} label="Content Node" sub="sling:resourceType" fill={GRAY_LIGHT} />
      <Arrow x1={240} y1={85} x2={330} y2={85} label="resolves to" />
      <DBox x={330} y={55} w={boxW} h={h} label="Component" sub="renders the node" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={550} y1={85} x2={640} y2={85} label="extends via" dashed />
      <DBox x={640} y={55} w={120} h={h} label="Super Type" sub="inherited" fill={GRAY_LIGHT} dashed />
    </svg>
  );
}

/* ---------- Module 3 diagrams ---------- */
function ComponentAnatomyDiagram() {
  const center = { x: 305, y: 95, w: 170, h: 60 };
  const sats = [
    { x: 15, y: 10, w: 150, h: 50, label: "Dialog" },
    { x: 615, y: 10, w: 150, h: 50, label: "Sling Model" },
    { x: 15, y: 190, w: 150, h: 50, label: "HTL Script" },
    { x: 615, y: 190, w: 150, h: 50, label: "CSS / JS" },
    { x: 305, y: 190, w: 170, h: 50, label: "Policy Support" },
  ];
  const cx = center.x + center.w / 2, cy = center.y + center.h / 2;
  return (
    <svg viewBox="0 0 780 260" className="w-full h-auto">
      <ArrowDefs />
      {sats.map((s, i) => {
        const sx = s.x + s.w / 2, sy = s.y + s.h / 2;
        return <Arrow key={i} x1={sx} y1={sy} x2={cx} y2={cy} />;
      })}
      {sats.map((s, i) => <DBox key={i} {...s} fill={GRAY_LIGHT} />)}
      <DBox {...center} label="Component" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
    </svg>
  );
}
function CoreComponentsDecisionDiagram() {
  return (
    <svg viewBox="0 0 780 190" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={300} y={10} w={180} h={50} label="Core Component Available?" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={340} y1={60} x2={130} y2={100} label="Matches need" />
      <Arrow x1={390} y1={60} x2={390} y2={100} label="Close, needs tweaks" />
      <Arrow x1={440} y1={60} x2={650} y2={100} label="No good fit" />
      <DBox x={20} y={100} w={220} h={60} label="Use Core Component As-Is" fill={GRAY_LIGHT} />
      <DBox x={280} y={100} w={220} h={60} label="Extend Core Component" fill={GRAY_LIGHT} />
      <DBox x={540} y={100} w={220} h={60} label="Build Custom Component" fill={GRAY_LIGHT} />
    </svg>
  );
}
function ResourceSuperTypeChainDiagram() {
  const w = 210, h = 60;
  const xs = [15, 285, 555];
  return (
    <svg viewBox="0 0 780 100" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={20} w={w} h={h} label="Your Custom Component" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[0] + w} y1={50} x2={xs[1]} y2={50} label="resourceSuperType" />
      <DBox x={xs[1]} y={20} w={w} h={h} label="Proxy Component" fill={GRAY_LIGHT} />
      <Arrow x1={xs[1] + w} y1={50} x2={xs[2]} y2={50} label="resourceSuperType" />
      <DBox x={xs[2]} y={20} w={w} h={h} label="Core Component (base)" fill={GRAY_LIGHT} />
    </svg>
  );
}
function SlingModelFlowDiagram() {
  const w = 175, h = 60;
  const xs = [15, 210, 415, 615];
  return (
    <svg viewBox="0 0 780 100" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={20} w={w} h={h} label="Resource / Request" fill={GRAY_LIGHT} />
      <Arrow x1={xs[0] + w} y1={50} x2={xs[1]} y2={50} label="adapts to" />
      <DBox x={xs[1]} y={20} w={w} h={h} label="Sling Model" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[1] + w} y1={50} x2={xs[2]} y2={50} label="exposes data" />
      <DBox x={xs[2]} y={20} w={w} h={h} label="HTL" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[2] + w} y1={50} x2={xs[3]} y2={50} />
      <DBox x={xs[3]} y={20} w={w} h={h} label="Rendered Output" fill={GRAY_LIGHT} />
    </svg>
  );
}

/* ---------- Module 4 diagram ---------- */
function TemplatePolicyFlowDiagram() {
  const w = 220, h = 60;
  const xs = [20, 280, 540];
  return (
    <svg viewBox="0 0 780 100" className="w-full h-auto">
      <ArrowDefs />
      <DBox x={xs[0]} y={20} w={w} h={h} label="Editable Template" sub="defines page structure" fill={GRAY_LIGHT} />
      <Arrow x1={xs[0] + w} y1={50} x2={xs[1]} y2={50} label="governs" />
      <DBox x={xs[1]} y={20} w={w} h={h} label="Template Policy" sub="allowed components, styles, rules" fill={RED_TINT} stroke={RED_TINT_LINE} labelColor={RED_DARK} />
      <Arrow x1={xs[1] + w} y1={50} x2={xs[2]} y2={50} label="constrains" />
      <DBox x={xs[2]} y={20} w={w} h={h} label="Author-Created Page" sub="content within controlled layout" fill={GRAY_LIGHT} />
    </svg>
  );
}

const DIAGRAMS = {
  stack: { component: ArchitectureStackDiagram, caption: "AEM is built as a layered stack: it runs on Apache Sling for request handling, Apache Jackrabbit Oak for content storage (JCR), and Apache Felix as the underlying OSGi Java container." },
  cloud: { component: CloudArchitectureDiagram, caption: "Code flows from Developer through Git and Cloud Manager's build/test/deploy pipeline into Author, then replicates to Publish, and reaches Website Users through Dispatcher/CDN." },
  apd: { component: APDArchitectureDiagram, caption: "Author is where content is created; Publish serves it to visitors; Dispatcher sits in front as a reverse proxy, cache, and security layer." },
  cicd: { component: CicdDiagram, caption: "Every commit moves through Cloud Manager's pipeline: build, quality gates, and security scan, before promotion to Dev, Stage, and Production." },
  localsdk: { component: LocalSdkDiagram, caption: "The day-to-day development loop: design and build locally against the AEM SDK, test, then commit for Cloud Manager to deploy." },
  slinglifecycle: { component: SlingLifecycleDiagram, caption: "A request is resolved to a resource \u2014 using its type, selectors, extension, and suffix \u2014 before HTL and a Sling Model render the response." },
  resourceresolution: { component: ResourceResolutionDiagram, caption: "A node's sling:resourceType determines which component renders it; that component can extend a super type via resourceSuperType." },
  componentanatomy: { component: ComponentAnatomyDiagram, caption: "A component is composed of its dialog, HTL script, Sling Model, optional CSS/JS, and policy support \u2014 all working together around one clear business need." },
  corecomponentsdecision: { component: CoreComponentsDecisionDiagram, caption: "Start by checking if a Core Component fits: use it as-is when it matches, extend it when it's close, and only build custom when there's no good fit." },
  resourcesupertypechain: { component: ResourceSuperTypeChainDiagram, caption: "resourceSuperType lets a custom component inherit from a proxy component, which in turn inherits from a Core Component \u2014 reusing behavior at every layer." },
  slingmodelflow: { component: SlingModelFlowDiagram, caption: "A Sling Model adapts from the resource or request, exposes clean data, and HTL renders that data \u2014 keeping logic and presentation separate." },
  templatepolicyflow: { component: TemplatePolicyFlowDiagram, caption: "The Editable Template defines structure, the Template Policy governs what's allowed inside it, and authors build pages within those constraints." },
};

/* ---------- small content blocks ---------- */
function Bullets({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((b, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: ACCENT_RED }} />
          <span className="text-[14.5px] leading-snug" style={{ color: "#3F3F3F" }}>{b}</span>
        </li>
      ))}
    </ul>
  );
}
function Steps({ title, items }) {
  return (
    <div>
      {title && <p className="text-[11px] font-extrabold uppercase tracking-widest mb-3" style={{ color: ACCENT_RED }}>{title}</p>}
      <ol className="space-y-3">
        {items.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold mt-0.5"
              style={{ background: RED_TINT, color: RED_DARK, border: `1px solid ${RED_TINT_LINE}` }}>
              {i + 1}
            </span>
            <span className="text-[14.5px] leading-snug" style={{ color: "#3F3F3F" }}>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
function TwoColumn({ leftTitle, leftItems, rightTitle, rightItems }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {[{ t: leftTitle, items: leftItems }, { t: rightTitle, items: rightItems }].map((col, ci) => (
        <div key={ci}>
          {col.t && <p className="text-[11px] font-extrabold uppercase tracking-widest mb-2.5" style={{ color: ACCENT_RED }}>{col.t}</p>}
          <Bullets items={col.items} />
        </div>
      ))}
    </div>
  );
}
function PillGroup({ label, items }) {
  return (
    <div>
      <p className="text-[11px] font-extrabold uppercase tracking-widest mb-2.5" style={{ color: GRAY }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((p, i) => (
          <span key={i} className="text-[12.5px] font-semibold px-3 py-1.5 rounded-full" style={{ background: RED_TINT, color: RED_DARK }}>{p}</span>
        ))}
      </div>
    </div>
  );
}
function RoleCards({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((c, i) => (
        <div key={i} className="rounded-xl p-5" style={{ background: GRAY_LIGHT }}>
          <p className="text-[14px] font-extrabold mb-3" style={{ color: RED_DARK }}>{c.title}</p>
          <p className="text-[10.5px] font-bold uppercase tracking-wide mb-1.5" style={{ color: GRAY }}>Used By</p>
          <p className="text-[12.5px] mb-3" style={{ color: "#3F3F3F" }}>{c.usedBy.join(" · ")}</p>
          <p className="text-[10.5px] font-bold uppercase tracking-wide mb-1.5" style={{ color: GRAY }}>Responsibilities</p>
          <ul className="space-y-1.5">
            {c.responsibilities.map((r, ri) => (
              <li key={ri} className="text-[12.5px] flex items-start gap-2" style={{ color: "#3F3F3F" }}>
                <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: ACCENT_RED }} />
                {r}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
function ModuleCards({ cards }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((c, i) => (
        <div key={i} className="rounded-xl p-4" style={{ background: i % 2 === 0 ? GRAY_LIGHT : RED_TINT, border: i % 2 === 0 ? "none" : `1px solid ${RED_TINT_LINE}` }}>
          <div className="flex items-center gap-1.5 mb-2">
            <Boxes size={13} style={{ color: RED_DARK }} />
            <code className="text-[13px] font-extrabold" style={{ color: RED_DARK }}>{c.title}</code>
          </div>
          <p className="text-[12px] leading-snug" style={{ color: "#3F3F3F" }}>{c.desc}</p>
        </div>
      ))}
    </div>
  );
}
function FileTree({ label, entries }) {
  return (
    <div className="rounded-xl p-5" style={{ background: INK }}>
      {label && <p className="text-[11px] font-extrabold uppercase tracking-widest mb-3" style={{ color: "#F5A99A" }}>{label}</p>}
      <div className="font-mono text-[12.5px] leading-relaxed">
        {entries.map((e, i) => (
          <div key={i} style={{ paddingLeft: `${e.depth * 18}px` }} className="flex items-center gap-1.5 py-0.5">
            {e.type === "folder" ? (
              <Folder size={13} style={{ color: "#F5A99A" }} className="shrink-0" />
            ) : (
              <FileCode size={13} style={{ color: "#9CC7FF" }} className="shrink-0" />
            )}
            <span style={{ color: e.type === "folder" ? "#F5A99A" : "#E8E8E8" }}>{e.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function FileReference({ items }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #ECECEC" }}>
      <table className="w-full text-[12.5px]">
        <thead>
          <tr style={{ background: GRAY_LIGHT }}>
            <th className="text-left px-4 py-2.5 font-extrabold" style={{ color: INK }}>File / Folder</th>
            <th className="text-left px-4 py-2.5 font-extrabold" style={{ color: INK }}>Purpose</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} style={{ borderTop: "1px solid #ECECEC" }}>
              <td className="px-4 py-2.5 font-mono whitespace-nowrap" style={{ color: RED_DARK }}>{it.file}</td>
              <td className="px-4 py-2.5" style={{ color: "#3F3F3F" }}>{it.purpose}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function CodeBlock({ label, code }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #ECECEC" }}>
      {label && (
        <div className="px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest" style={{ background: GRAY_LIGHT, color: INK }}>
          {label}
        </div>
      )}
      <pre className="px-4 py-3.5 text-[12.5px] leading-relaxed overflow-x-auto" style={{ background: INK, color: "#E8E8E8", fontFamily: "'SF Mono', Menlo, Consolas, monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
function Intro({ text }) {
  return (
    <p className="text-[15px] leading-relaxed" style={{ color: "#3F3F3F" }}>{text}</p>
  );
}
function Callout({ label, text }) {
  return (
    <div className="rounded-xl p-5 border-l-4" style={{ background: RED_TINT, borderColor: ACCENT_RED }}>
      <p className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5" style={{ color: RED_DARK }}>{label}</p>
      <p className="text-[14px] italic leading-snug" style={{ color: "#3F3F3F" }}>{text}</p>
    </div>
  );
}

const MODULES = [
  {
    id: "m1",
    numeral: "01",
    title: "Introduction to AEM Sites on AEM as a Cloud Service",
    topics: [
      {
        id: "m1-overview", icon: BookOpen, title: "Adobe Experience Manager Product overview & Architecture",
        bullets: [
          "Adobe's enterprise Content Management System (CMS), part of Adobe Experience Cloud",
          "Creates, manages, and delivers digital experiences across websites, mobile apps, and other digital channels",
          "Provides content authoring, asset management, personalization, workflow automation, and headless content delivery",
          "Architecturally, AEM is a layered stack: it runs on Apache Sling (web application framework), which sits on Apache Jackrabbit Oak (the JCR content repository), all hosted inside Apache Felix, an OSGi Java container",
          "This layered design is what makes AEM modular \u2014 each layer can be extended or swapped independently, and OSGi bundles let features be deployed without restarting the whole application",
        ],
        diagram: "stack",
        pillGroups: [{ label: "Key Products", items: ["AEM Sites", "AEM Assets", "AEM Forms", "AEM Headless", "AEM Edge Delivery Services"] }],
        callout: { label: "Key Message", text: "This bootcamp focuses on AEM Sites \u2014 building reusable website components." },
      },
      {
        id: "m1-capabilities", icon: Layers, title: "AEM Sites Overview & Capabilities",
        intro: "AEM Sites is the web content management (WCM) component of Adobe Experience Manager. It lets marketing and IT teams create, edit, manage, and publish digital content across websites and other channels without needing deep technical expertise for day-to-day authoring, while still giving developers a robust framework to build on.",
        twoColumn: {
          leftTitle: "Authoring & Content", leftItems: ["Page authoring via drag-and-drop components", "Editable Templates", "Reusable Components", "Content Fragments", "Experience Fragments"],
          rightTitle: "Platform Capabilities", rightItems: ["Multi-Site Management (MSM)", "Responsive Authoring", "Localization support", "Workflow integration", "Versioning and Rollback"],
        },
        pillGroups: [{ label: "Business Benefits", items: ["Faster website development", "Consistent branding", "Improved author experience", "Content reuse", "Reduced development effort"] }],
        callout: { label: "Transition", text: "To build these experiences efficiently, Adobe recommends using reusable components rather than page-specific implementations." },
      },
      {
        id: "m1-cloud-architecture", icon: Cloud, title: "AEM as a Cloud Service architecture",
        intro: "AEM as a Cloud Service is Adobe's fully-managed, cloud-native version of AEM \u2014 it represents the next-generation Experience Manager and is delivered as a Software as a Service (SaaS) solution.",
        twoColumn: {
          leftTitle: "Adobe Manages", leftItems: ["Infrastructure", "Scaling", "Monitoring", "Security patches", "Upgrades"],
          rightTitle: "Developers Focus On", rightItems: ["Components", "Templates", "Content models", "Business logic"],
        },
        diagram: "cloud",
        pillGroups: [{ label: "Advantages", items: ["Automatic upgrades", "Auto scaling", "Continuous deployment", "Reduced operational effort", "Cloud-native architecture"] }],
      },
      {
        id: "m1-apd-architecture", icon: Server, title: "Author\u2013Publish\u2013Dispatcher architecture",
        diagram: "apd",
        roleCards: [
          { title: "Author", usedBy: ["Content Authors", "Marketing Teams", "Administrators"], responsibilities: ["Create pages", "Edit content", "Manage assets", "Preview content", "Publish content"] },
          { title: "Publish", usedBy: ["Website Visitors"], responsibilities: ["Serve published content", "Handle requests", "Execute Sling rendering", "Deliver pages securely"] },
          { title: "Dispatcher", usedBy: ["Reverse Proxy", "Cache Layer", "Security Layer"], responsibilities: ["Cache rendered pages", "Improve performance", "Filter invalid requests", "Reduce Publish server load"] },
        ],
        callout: { label: "Best Practice", text: "Design components with caching in mind to maximize Dispatcher effectiveness." },
      },
      {
        id: "m1-cloud-manager", icon: GitBranch, title: "Cloud Manager & CI/CD overview",
        bullets: ["Source code management", "CI/CD pipelines", "Code quality checks", "Security scanning", "Performance testing", "Deployment automation"],
        diagram: "cicd",
        callout: { label: "Expectations", text: "Follow coding standards, pass Sonar quality checks, write maintainable code, and optimize performance." },
      },
      {
        id: "m1-local-sdk", icon: Terminal, title: "Local SDK development workflow",
        diagram: "localsdk",
        pillGroups: [
          { label: "Project Modules", items: ["core", "ui.apps", "ui.content", "ui.frontend", "ui.config", "all"] },
          { label: "Tools", items: ["IntelliJ IDEA / Eclipse", "VS Code", "Maven", "Git", "Local AEM SDK", "Browser DevTools"] },
        ],
      },
      {
        id: "m1-summary", icon: Flag, title: "Closing Summary for the Section",
        bullets: [
          "What Adobe Experience Manager is and where AEM Sites fits within the product suite",
          "Why organizations are adopting AEM as a Cloud Service for modern website development",
          "The roles of Author, Publish, and Dispatcher in serving web content",
          "How Cloud Manager enables CI/CD and enforces code quality for AEM projects",
          "The typical local development workflow you'll follow throughout the bootcamp",
        ],
        callout: { label: "Up Next", text: "Now that we understand the platform and deployment model, let's explore the core development concepts that power AEM Sites \u2014 starting with Sling, the JCR repository, and how AEM resolves and renders content." },
      },
    ],
  },
  {
    id: "m2",
    numeral: "02",
    title: "AEM Development Fundamentals",
    topics: [
      {
        id: "m2-jcr", icon: Layers, title: "JCR repository & content structure",
        intro: "The Java Content Repository (JCR) is a hierarchical, tree-structured content store \u2014 everything in AEM, from pages to assets to configuration, is a node with properties, organized under paths like /content and /conf.",
        bullets: [
          "The JCR repository is the content storage layer used by AEM",
          "Authors work with content in the repository, while developers deploy code into AEM project modules",
          "Good content structure makes pages easier to manage and reuse",
        ],
        pillGroups: [{ label: "Stored In The Repository", items: ["Pages", "Component content", "Templates", "Policies", "Assets", "Configuration"] }],
        callout: { label: "Key Message", text: "AEM separates content from code, and the JCR repository is where the authored experience lives." },
      },
      {
        id: "m2-resource-resolution", icon: Cloud, title: "Resource resolution & resource types (incl. sling:resourceType)",
        intro: "Resource resolution is how Sling maps a content node to the component that renders it \u2014 the mechanism that drives every request in AEM.",
        bullets: [
          "A resource in Sling represents something addressable in the repository",
          "The sling:resourceType property on a content node tells AEM which component should render that resource",
          "Resource super type (sling:resourceSuperType) allows reuse and inheritance across components",
          "Resource resolution is one of the core ideas behind AEM's flexible component model",
        ],
        diagram: "resourceresolution",
        callout: { label: "Key Message", text: "Resource type is the bridge between content and rendering logic." },
      },
      {
        id: "m2-sling-lifecycle", icon: BookOpen, title: "Sling request processing lifecycle",
        bullets: [
          "Sling is the web framework at the heart of AEM",
          "A request is first mapped to a resource, not directly to a servlet or controller",
          "Rendering usually happens through HTL, backed by a Sling Model or script",
          "Understanding request resolution is essential for debugging component rendering issues",
        ],
        pillGroups: [{ label: "Sling Resolves Requests Using", items: ["Resource type", "Selectors", "Extension", "Suffix"] }],
        diagram: "slinglifecycle",
        callout: { label: "Key Message", text: "In AEM, requests are resolved around content and resource types, which makes component-driven development possible." },
      },
      {
        id: "m2-templates", icon: Server, title: "Templates (Editable vs Dynamic)",
        intro: "A template is a reusable blueprint for creating pages.",
        bullets: [
          "Defines the page structure \u2014 layout containers and sections",
          "Defines the components authors are allowed to use",
          "Defines policies \u2014 default settings and styling",
          "Defines locked structural areas (e.g. header/footer) vs. editable areas for authors",
          "In AEM as a Cloud Service, these are called Editable Templates and are authored visually in the browser",
          "Stored at /conf/<project>/settings/wcm/templates",
        ],
        twoColumn: {
          leftTitle: "Editable Templates", leftItems: ["Structure defined via a dedicated structure page", "Template policies configured per template", "Widely used, mature model", "More manual setup for structure and policies"],
          rightTitle: "Dynamic Templates", rightItems: ["No separate structure page \u2014 structure lives with the template itself", "Simpler authoring and policy model", "Improved performance and caching", "Adobe's recommended direction for new templates"],
        },
        steps: {
          title: "How to Create a Template",
          items: [
            "Go to Tools \u2192 General \u2192 Templates",
            "Click \u201cCreate\u201d, select a Template Type, and give it a Title",
            "Open the template \u2014 the root Layout Container is already there by default",
            "Add components into the container (hover \u2192 blue \u201c+\u201d icon)",
            "Lock structural elements (e.g. header/footer) using the padlock icon",
            "Set Policy to choose which components authors are allowed to use",
            "Set Page Policy for title format, thumbnail, and allowed child templates",
            "Click \u201cEnable\u201d to make the template available for page/site creation",
            "Use it: Sites \u2192 Create \u2192 Page \u2192 select your template",
          ],
        },
        pillGroups: [{ label: "A Template Policy Controls", items: ["Which components authors can use", "What those components look like by default", "Page details like title format and thumbnail", "Which templates can be used as child pages", "Can be changed anytime, no code needed"] }],
      },
      {
        id: "m2-page-from-template", icon: GitBranch, title: "How a Page is created from a Template",
        intro: "A Page is a single web page in your site (e.g. Home, About Us, Contact) \u2014 it's what actually gets a URL and shows up in a browser.",
        bullets: [
          "Every page is created from a Template \u2014 the template gives it structure; the page holds the actual content",
          "Pages live under /content/<project>/... in the repository (e.g. /content/mysite/en/home)",
          "Inside a page, you drag components (Text, Image, Title, etc.) into the layout to build the actual content",
          "Each page has Properties (title, description, thumbnail, tags), Content (the components and their filled-in values), and a Published/Unpublished state (whether it's live on the website or not)",
          "An author selects a template from the Sites console when creating a new page",
          "AEM creates a page node with a jcr:content child, and sets its sling:resourceType and cq:template to reference the chosen template",
          "The page inherits the template's structure and template policies, which determine which components and layouts are allowed",
          "Authors then add and configure allowed components inside the page's editable regions (parsys/responsive grid)",
        ],
        pillGroups: [{ label: "Key Properties Set On The Page", items: ["jcr:primaryType = cq:Page", "cq:template", "sling:resourceType", "jcr:content"] }],
        callout: { label: "Key Message", text: "The template is the contract; page creation is simply instantiating that contract as real, authorable content." },
      },
      {
        id: "m2-page-component", icon: FileCode, title: "Page Component \u2014 the code that renders a Page",
        bullets: [
          "The Page Component is the component associated with a page's sling:resourceType, typically extending a core/foundation page component",
          "It renders the overall HTML document \u2014 <head>, client library includes, <body> \u2014 and the top-level container where authorable content lives",
          "It's where page-level concerns are handled: metadata, SEO tags, analytics, responsive grid setup, and header/footer includes",
          "Individual content components (text, image, teaser, etc.) render inside the regions the Page Component defines, not the other way around",
        ],
        callout: { label: "Key Message", text: "Every page render starts with the Page Component \u2014 it's the outer shell that everything else authors add renders inside of." },
      },
      {
        id: "m2-project-modules", icon: Boxes, title: "Project modules: core, ui.apps, ui.content, ui.frontend, ui.apps.structure, dispatcher, ui.config",
        fileTree: {
          label: "Project Root",
          entries: [
            { depth: 0, type: "folder", name: "core" },
            { depth: 0, type: "folder", name: "ui.apps" },
            { depth: 0, type: "folder", name: "ui.apps.structure" },
            { depth: 0, type: "folder", name: "ui.content" },
            { depth: 0, type: "folder", name: "ui.frontend" },
            { depth: 0, type: "folder", name: "ui.config" },
            { depth: 0, type: "folder", name: "dispatcher" },
            { depth: 0, type: "file", name: "pom.xml" },
          ],
        },
        moduleCards: [
          { title: "core", desc: "Java code \u2014 Sling Models, services, and business logic" },
          { title: "ui.apps", desc: "Component definitions, dialogs, client libraries, and application code" },
          { title: "ui.content", desc: "Sample content, page structures, templates, and configuration content" },
          { title: "ui.frontend", desc: "Front-end build pipeline \u2014 CSS/JS source compiled into ui.apps client libraries" },
          { title: "ui.apps.structure", desc: "Boring plumbing that protects the folder structure so packages don't overwrite each other. You basically never touch this." },
          { title: "dispatcher", desc: "Dispatcher rules and caching-related configuration" },
          { title: "ui.config", desc: "OSGi configurations, kept separate from code and content for environment-specific overrides" },
        ],
        callout: { label: "Key Message", text: "Each module has a specific purpose, and keeping them separated improves clarity, review scope, and deployment quality." },
      },
      {
        id: "m2-best-practices", icon: Terminal, title: "AEM project best practices",
        bullets: [
          "Use clean naming conventions for components, models, dialogs, and client libraries",
          "Keep reusable logic in Java models or services rather than in HTL",
          "Use editable templates and policies instead of hardcoding page structure",
          "Design components with authors in mind: predictable, configurable, and easy to reuse",
          "Follow accessibility and responsive design practices from the beginning",
          "Keep client libraries organized and scoped properly",
          "Build Cloud Service projects with performance, security, and maintainability in mind",
        ],
        callout: { label: "Key Message", text: "Good AEM projects are not just functional; they are reusable, author-friendly, and production-ready." },
      },
      {
        id: "m2-summary", icon: Flag, title: "Closing Summary for the Section",
        bullets: [
          "How content is stored in JCR, and how resource types drive rendering",
          "How AEM processes a request end to end via Sling",
          "The difference between Editable and Dynamic templates, and how a page is created from one",
          "The role of the Page Component as the shell every other component renders inside of",
          "How the AEM project is organized across modules, including ui.frontend, ui.apps.structure, and ui.config",
          "What good project discipline looks like in real implementations",
        ],
      },
    ],
  },
  {
    id: "m3",
    numeral: "03",
    title: "Reusable Component Engineering",
    topics: [
      {
        id: "m3-component-architecture", icon: BookOpen, title: "Component, architecture & boundary design",
        intro: "A component is a reusable content block \u2014 it defines what it looks like and what an author can fill in \u2014 and pages are just templates filled with a bunch of components.",
        bullets: [
          "AEM components are the reusable building blocks of pages",
          "A good component should be easy for authors to configure",
          "Each component should solve one clear business need",
          "Component engineering is about balancing reuse, flexibility, and simplicity",
          "Component boundary design defines what belongs inside one component and what should stay separate",
          "Not everything should be merged into one large component",
          "Good boundaries improve reuse across pages and use cases",
          "Clear boundaries reduce complexity and improve maintainability",
        ],
        diagram: "componentanatomy",
        fileTree: {
          label: "Sample Project \u2014 Hero Banner Component",
          entries: [
            { depth: 0, type: "folder", name: "ui.apps/.../apps/myproject/components/heroBanner/" },
            { depth: 1, type: "file", name: ".content.xml" },
            { depth: 1, type: "file", name: "heroBanner.html" },
            { depth: 1, type: "folder", name: "_cq_dialog/" },
            { depth: 2, type: "file", name: ".content.xml" },
            { depth: 1, type: "folder", name: "clientlibs/" },
            { depth: 2, type: "file", name: ".content.xml" },
            { depth: 2, type: "file", name: "css.txt" },
            { depth: 2, type: "file", name: "js.txt" },
            { depth: 2, type: "folder", name: "css/" },
            { depth: 3, type: "file", name: "heroBanner.css" },
            { depth: 2, type: "folder", name: "js/" },
            { depth: 3, type: "file", name: "heroBanner.js" },
            { depth: 0, type: "folder", name: "core/.../myproject/core/models/" },
            { depth: 1, type: "file", name: "HeroBannerModel.java" },
          ],
        },
        fileReference: [
          { file: ".content.xml", purpose: "Component definition \u2014 jcr:title, sling:resourceType, componentGroup" },
          { file: "heroBanner.html", purpose: "HTL script that renders the component's markup" },
          { file: "_cq_dialog/.content.xml", purpose: "Author dialog \u2014 defines the fields authors see and edit" },
          { file: "clientlibs/", purpose: "CSS/JS client library, referenced on the page via categories" },
          { file: "HeroBannerModel.java", purpose: "Sling Model \u2014 backs the HTL with Java logic, lives in the core module" },
        ],
        pillGroups: [
          { label: "A Component Typically Includes", items: ["Dialog", "HTL script", "Sling Model", "CSS/JS (if required)", "Policy support (where applicable)"] },
          { label: "Ask These Questions", items: ["Should this be one component or multiple?", "What should the author control?", "What should stay fixed by design?"] },
        ],
        callout: { label: "Key Message", text: "A well-designed AEM component is small, focused, reusable, and has clear boundaries between what's fixed and what authors control." },
      },
      {
        id: "m3-component-creation-steps", icon: ListOrdered, title: "Component creation steps (definition \u2192 HTL \u2192 dialog \u2192 Sling Model \u2192 deploy)",
        intro: "Building a component follows a consistent path: definition \u2192 HTL \u2192 dialog \u2192 Sling Model \u2192 deploy.",
        steps: {
          title: "Steps to Create a Component",
          items: [
            "Define the component \u2014 create the component folder and .content.xml (jcr:title, sling:resourceType, componentGroup)",
            "Build the HTL script \u2014 write the markup that renders the component, using placeholders for dynamic data",
            "Add the dialog \u2014 create _cq_dialog/.content.xml defining the fields authors will see and edit",
            "Create the Sling Model \u2014 back the HTL with a Java class that reads dialog values and prepares data",
            "Wire it together \u2014 reference the Sling Model in the HTL via data-sly-use",
            "Add client libraries \u2014 attach CSS/JS via clientlibs and categories, if needed",
            "Deploy \u2014 build and install the ui.apps/core packages to AEM to make the component available",
          ],
        },
        callout: { label: "Key Message", text: "Each layer has one job \u2014 definition wires it up, HTL renders it, the dialog configures it, and the Sling Model supplies clean data." },
      },
      {
        id: "m3-core-components", icon: Cloud, title: "Core Components strategy: reuse vs. extend",
        bullets: [
          "Adobe Core Components provide a strong foundation for many AEM Sites implementations",
          "Building on Adobe-supported functionality improves consistency and speed",
          "Core Components help teams avoid unnecessary duplication",
          "Most enterprise AEM implementations should start here",
        ],
        twoColumn: {
          leftTitle: "Reuse As-Is", leftItems: ["Use the Core Component directly with configuration only", "Fastest path, fully supported and maintained by Adobe", "No custom code to maintain going forward"],
          rightTitle: "Extend", rightItems: ["Create a proxy component with a custom resourceSuperType", "Add custom markup, fields, or logic on top of Core Component behavior", "Used when requirements go beyond what configuration/policy can offer"],
        },
        diagram: "corecomponentsdecision",
        callout: { label: "Key Message", text: "Core Components should be the starting point for most enterprise AEM implementations \u2014 reuse first, extend only when requirements demand it." },
      },
      {
        id: "m3-resource-supertype", icon: Server, title: "Proxy components & resource super type",
        intro: "A proxy component is a thin, local stand-in for a Core Component \u2014 it lets your project configure and extend Adobe's component without touching its original code.",
        bullets: [
          "Resource super type is a key reuse mechanism in AEM",
          "It allows one component to inherit behavior from another",
          "This avoids rewriting existing rendering logic",
          "A proxy component is a project-level component (e.g. under /apps/myproject/components) whose resourceSuperType points at a Core Component, without adding its own logic yet",
          "Proxies let a project reference and configure Core Components locally \u2014 setting policies, allowed components, and enabling future customization",
          "Custom components can extend Core Components or other custom components; commonly used for proxy components and lightweight customization",
        ],
        diagram: "resourcesupertypechain",
        codeBlock: {
          label: "Example \u2014 Proxy for the Core Title Component",
          code: `/apps/myproject/components/title/.content.xml

<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:jcr="http://www.jcp.org/jcr/1.0"
    jcr:primaryType="cq:Component"
    jcr:title="Title"
    sling:resourceSuperType="core/wcm/components/title/v3/title"
    componentGroup="MyProject Content"/>`,
        },
        callout: { label: "Key Message", text: "Resource super type helps developers reuse and extend behavior without duplication; proxy components are the standard way to apply it." },
      },
      {
        id: "m3-htl-best-practices", icon: Terminal, title: "HTL best practices",
        bullets: [
          "HTL is AEM's server-side templating language for rendering components",
          "HTL should mainly display data, not contain complex business logic",
          "Keep logic minimal and let Sling Models prepare the data",
          "Use readable templates with clear markup and safe output handling",
          "HTL supports clean separation between presentation and logic",
          "Use conditionals and loops carefully so templates stay easy to understand",
        ],
        callout: { label: "Key Message", text: "HTL should stay simple, readable, and focused on presentation." },
      },
      {
        id: "m3-sling-models", icon: GitBranch, title: "Sling Models & model injection",
        bullets: [
          "Sling Models move Java logic out of HTL into clean, testable classes",
          "Models adapt from resources or requests and expose data to the component",
          "Injection annotations pull values into the model automatically \u2014 no manual repository lookups needed",
          "Injection strategy (OPTIONAL vs REQUIRED) controls whether a model fails to adapt when a value is missing",
          "Keep models focused and avoid making them too large",
          "Sling Models improve readability and maintainability",
        ],
        diagram: "slingmodelflow",
        pillGroups: [
          { label: "Common Injectors", items: ["@ValueMapValue", "@ChildResource", "@Self", "@ScriptVariable", "@OSGiService"] },
          { label: "Common Uses", items: ["Reading dialog fields", "Assembling content", "Preparing lists or child resources", "Handling conditional logic"] },
        ],
        callout: { label: "Key Message", text: "Sling Models keep component logic clean and separate from the rendering layer." },
      },
      {
        id: "m3-composition-patterns", icon: Puzzle, title: "Component composition & reusability patterns",
        bullets: [
          "Composition favors building small, focused components that combine into larger experiences, rather than one large monolithic component",
          "Common patterns: container/layout components, content components (text, image, teaser), and composite components that assemble several content components together",
          "Shared logic belongs in Sling Models or services, not copy-pasted across components",
          "Resource super type and proxy components support reuse without duplicating markup or dialogs",
          "Design components to be configurable (via dialog and policy) rather than hardcoded, so the same component works across different pages and contexts",
        ],
        callout: { label: "Key Message", text: "Reusability comes from composing small, well-bounded components \u2014 not from making one component do everything." },
      },
      {
        id: "m3-content-fragments", icon: FileText, title: "Content Fragments",
        intro: "A Content Fragment is reusable, structured content \u2014 like an article or product description \u2014 that isn't tied to any one page's layout.",
        bullets: [
          "Its fields (title, body, image, etc.) are defined by a Content Fragment Model, kind of like a form template",
          "It's stored once in the DAM, and any page, component, or app can pull it in and reuse it",
          "Because it has no layout of its own, the same content can look different on a website, in a mobile app, or in an API response",
          "Good for content that repeats or gets reused a lot, like articles, product info, or FAQs",
        ],
        callout: { label: "Key Message", text: "Content Fragments decouple structured content from presentation, so the same content can power multiple pages, apps, or channels." },
      },
      {
        id: "m3-experience-fragments", icon: Image, title: "Experience Fragments",
        intro: "A reusable, pre-built chunk of a page \u2014 a complete block of layout + components (e.g. a promo banner, a footer, a hero section) that you build once and reuse across multiple pages.",
        bullets: [
          "Unlike a Content Fragment (just structured data, no design), an Experience Fragment includes the actual components and visual layout",
          "Common use cases: shared campaign banners, consistent footers/headers across many pages, reusable promotional blocks",
          "Lives under /content/experience-fragments/<project>/...",
          "Can be reused via reference \u2014 edit it once, and it updates everywhere it's placed (unless a page has \u201cdetached\u201d its own copy)",
        ],
        callout: { label: "Key Message", text: "Experience Fragments reuse presentation and layout, not just data \u2014 use them when the reusable unit should look and behave the same everywhere." },
      },
      {
        id: "m3-cf-vs-xf", icon: Layers, title: "Content Fragments vs. Experience Fragments \u2014 when to use each",
        intro: "Content Fragment \u2014 \u201cWhat content should I show?\u201d Experience Fragment \u2014 \u201cHow should this experience be presented?\u201d",
        twoColumn: {
          leftTitle: "Content Fragments", leftItems: ["Structured data, no layout or styling", "Defined by a Content Fragment Model (schema)", "Best for channel-agnostic, reusable content (articles, product info)", "Consumed by components, pages, or headless apps"],
          rightTitle: "Experience Fragments", rightItems: ["Composed of components, with layout and styling included", "Authored like a mini page", "Best for reusable presentation (banners, footers, promos)", "Reused as-is across pages and channels"],
        },
        callout: { label: "Key Message", text: "Choose Content Fragments for reusable structured data, and Experience Fragments for reusable presentation." },
      },
      {
        id: "m3-summary", icon: Flag, title: "Closing Summary for the Section",
        bullets: [
          "How AEM components are structured, bounded, and built step by step",
          "When to reuse Core Components as-is vs. extend them through proxy components",
          "How resource super type supports reuse without duplication",
          "Why Sling Models and model injection keep logic clean",
          "How HTL fits into the component rendering flow",
          "How composition patterns support reusability",
          "The difference between Content Fragments and Experience Fragments, and when to use each",
        ],
      },
    ],
  },
  {
    id: "m4",
    numeral: "04",
    title: "Author-Friendly Component Design",
    topics: [
      {
        id: "m4-style-system", icon: Cloud, title: "Style System",
        bullets: [
          "The Style System lets authors apply design variations without custom development",
          "Style variations should be lightweight and consistent with design standards",
          "Reduces the need for separate components for minor visual changes",
          "Works best when combined with editable templates and policies",
          "Helps authors personalize content while staying within brand guidelines",
        ],
        pillGroups: [{ label: "Used For", items: ["Spacing", "Color", "Layout", "Emphasis"] }],
        callout: { label: "Key Message", text: "Style System gives authors design flexibility without increasing component complexity." },
      },
      {
        id: "m4-granite-dialogs", icon: Server, title: "Granite UI dialogs",
        twoColumn: {
          leftTitle: "Good Dialog Design", leftItems: ["Simple, clear, aligned with author workflow", "Use validation, defaults, and conditional fields where appropriate"],
          rightTitle: "Avoid", rightItems: ["Overloading dialogs with too many options"],
        },
        bullets: ["Dialogs control fields such as text, images, links, and component options", "Dialog design directly affects author experience"],
        callout: { label: "Key Message", text: "A well-designed dialog makes the component easier to understand and use." },
      },
      {
        id: "m4-client-libraries", icon: GitBranch, title: "Client libraries \u2014 structure, embed vs. dependency, loading strategy",
        bullets: [
          "A client library (clientlib) packages a component or feature's CSS and JS under one or more named categories",
          "Structure: css.txt and js.txt list the files to include, in order; .content.xml declares the categories, dependencies, and embed relationships",
          "Embed inlines another clientlib's code into this one at build time \u2014 use it when you want the code bundled together",
          "Dependency just makes sure the other clientlib loads first, without duplicating its code \u2014 use it to avoid pulling the same code in twice",
          "Loading strategy: clientlibs are pulled onto the page by category (e.g. via HTL's clientlib.css / clientlib.js), and JS can be marked async or deferred",
        ],
        pillGroups: [
          { label: "Key Properties", items: ["categories", "embed", "dependencies", "allowProxy"] },
          { label: "Best Practice", items: ["Organize per component, load once per page", "Bundle component clientlibs via embed into one site-wide clientlib", "Keep author-only scripts in a separate clientlib", "Set allowProxy=\"true\" under /apps"] },
        ],
        callout: { label: "Key Message", text: "Getting embed vs. dependency right avoids duplicated or missing code in the bundled CSS/JS." },
      },
      {
        id: "m4-author-experience", icon: Terminal, title: "Author experience best practices",
        bullets: [
          "Design components with the author in mind",
          "Keep component names intuitive and business-friendly",
          "Use helpful labels, placeholders, and defaults in dialogs",
          "Reduce the number of steps needed to create or configure content",
          "Make component output predictable and easy to preview",
          "Support responsive and accessible authoring decisions",
        ],
        callout: { label: "Key Message", text: "A great component is not just technically correct; it is easy for authors to use well." },
      },
      {
        id: "m4-governance", icon: ShieldCheck, title: "Content governance & component usage guidelines",
        bullets: [
          "Content governance defines how components and content should be used across the site",
          "Helps maintain brand consistency and editorial control",
          "Define when to use a component and when not to use it",
          "Provide usage guidance for authors and content teams",
        ],
        pillGroups: [{ label: "Governance Should Include", items: ["Clear names for components and content", "Simple rules for how content is organized", "A list of approved design/style variations"] }],
        callout: { label: "Key Message", text: "Content governance keeps the site consistent, scalable, and easy to manage." },
      },
      {
        id: "m4-summary", icon: Flag, title: "Closing Summary for the Section",
        bullets: [
          "How the Style System supports visual variation",
          "How Granite UI dialogs guide author input",
          "How client libraries are structured, and when to use embed vs. dependency",
          "What makes a component genuinely author-friendly",
          "How governance improves authoring consistency",
        ],
        callout: { label: "Up Next", text: "Now that we know how to make components author-friendly, we will look at enterprise best practices such as accessibility, responsive design, documentation, naming standards, and performance." },
      },
    ],
  },
  {
    id: "m5",
    numeral: "05",
    title: "Enterprise Best Practices",
    topics: [
      {
        id: "m5-responsive-design", icon: Layers, title: "Responsive design principles",
        intro: "Responsive design means a component looks and works well at every screen size, using a mobile-first approach: design for the smallest screen first, then progressively enhance for larger breakpoints.",
        bullets: [
          "Always follow a mobile-first approach \u2014 design and build for the smallest screen first, then enhance for larger ones",
          "Design components for mobile, tablet, and desktop from the start",
          "Use flexible layouts instead of fixed-width assumptions",
          "Ensure images, cards, and containers adapt to screen size",
          "Keep content hierarchy clear across breakpoints",
          "Test authoring output on multiple viewport sizes",
          "Improves usability and consistency across devices",
        ],
        pillGroups: [{ label: "In AEM, This Is Driven By", items: ["Responsive grid (12-column layout container)", "Breakpoints: mobile / tablet / desktop", "Per-breakpoint show/hide and column width, set by authors", "CSS media queries in the component's clientlib"] }],
        callout: { label: "Key Message", text: "Responsive design ensures components work well in every screen size and layout." },
      },
      {
        id: "m5-accessibility", icon: ShieldCheck, title: "Accessibility (WCAG) best practices",
        bullets: [
          "Build components with semantic HTML",
          "Support keyboard navigation and visible focus states",
          "Use proper labels, alt text, and ARIA attributes where needed",
          "Ensure sufficient color contrast for text and controls",
          "Make interactive components usable with assistive technologies",
          "Accessibility should be part of component design, not an afterthought",
        ],
        callout: { label: "Key Message", text: "Accessible components create inclusive experiences for all users." },
      },
      {
        id: "m5-documentation", icon: BookOpen, title: "Component documentation standards",
        bullets: [
          "Document what the component does and when to use it",
          "Include dialog field descriptions and authoring guidance",
          "Add implementation notes for developers",
          "Mention limitations, dependencies, and reuse rules",
          "Use screenshots or examples where helpful",
          "Good documentation reduces confusion and improves long-term maintainability",
        ],
        callout: { label: "Key Message", text: "Documentation makes components easier to adopt, use, and support." },
      },
      {
        id: "m5-code-organization", icon: Boxes, title: "Code organization & naming conventions",
        bullets: [
          "Keep code structure logical and predictable",
          "Use clear names for components, dialogs, models, and client libraries",
          "Follow consistent folder and package organization",
          "Keep Java, HTL, and CSS responsibilities separated",
          "Avoid unclear abbreviations and inconsistent naming",
          "Good organization helps teams understand and maintain the project",
        ],
        callout: { label: "Key Message", text: "Clean structure and naming make the codebase easier to read and scale." },
      },
      {
        id: "m5-performance", icon: Zap, title: "Performance considerations",
        bullets: [
          "Keep components lightweight and focused",
          "Avoid unnecessary repository calls inside rendering logic",
          "Optimize images, scripts, and styles for faster loading",
          "Use client libraries efficiently and avoid duplication",
          "Design with Dispatcher caching in mind",
          "Performance should be considered during component design, not after delivery",
        ],
        callout: { label: "Key Message", text: "High-performing components improve site speed, scalability, and user experience." },
      },
      {
        id: "m5-cloud-service-practices", icon: Cloud, title: "Cloud Service development best practices",
        bullets: [
          "Follow AEM as a Cloud Service project structure and deployment model",
          "Keep code compatible with Cloud Manager validation and CI/CD",
          "Respect immutable repository principles",
          "Use local SDK for development and testing",
          "Avoid manual production changes outside the supported workflow",
          "Build with maintainability, security, and deployment readiness in mind",
        ],
        callout: { label: "Key Message", text: "Cloud Service best practices help ensure reliable, scalable, and supportable AEM implementations." },
      },
      {
        id: "m5-summary", icon: Flag, title: "Closing Summary for the Section",
        bullets: [
          "How to design for responsive layouts",
          "How to make components accessible",
          "How to document components properly",
          "How to maintain clean code structure and naming",
          "How to optimize for performance",
          "How to follow AEM as a Cloud Service development practices",
        ],
        callout: { label: "Up Next", text: "Now that we have covered enterprise best practices, we will walk through a live demonstration of a reusable component and see how dialog, Sling Model, and HTL work together in practice." },
      },
    ],
  },
];

const FLAT_TOPICS = MODULES.flatMap((m, mi) =>
  m.topics.map((t, ti) => ({ ...t, moduleIndex: mi, moduleNumeral: m.numeral, moduleTitle: m.title, numbering: `${mi + 1}.${ti + 1}` }))
);

export default function ModuleDashboard() {
  const [activeId, setActiveId] = useState(FLAT_TOPICS[0].id);
  const [collapsed, setCollapsed] = useState({});
  const activeIndex = FLAT_TOPICS.findIndex((t) => t.id === activeId);
  const active = FLAT_TOPICS[activeIndex];
  const diagram = active.diagram ? DIAGRAMS[active.diagram] : null;
  const DiagramComponent = diagram?.component;

  const toggleModule = (mid) => setCollapsed((prev) => ({ ...prev, [mid]: !prev[mid] }));

  return (
    <div className="min-h-screen w-full flex" style={{ background: "#FAFAFA", fontFamily: "'Adobe Clean', Arial, sans-serif" }}>
      <aside className="w-80 shrink-0 min-h-screen px-5 py-7 overflow-y-auto" style={{ background: RED_DEEPER }}>
        <div className="flex items-center gap-2 mb-1 px-1">
          <span className="text-white font-extrabold text-[13px] tracking-wide">AEM Sites Implementation and Reuseable Component Engineering</span>
        </div>
        <p className="text-red-200 text-[11.5px] px-1 mb-6">Day 1 · Mentor Session Deep-Dive</p>

        {MODULES.map((m) => {
          const isCollapsed = collapsed[m.id];
          return (
            <div key={m.id} className="mb-4">
              <button
                onClick={() => toggleModule(m.id)}
                className="w-full flex items-center gap-2 px-1 py-1.5 mb-1 text-left"
              >
                <ChevronDown size={13} className="text-red-200 shrink-0 transition-transform" style={{ transform: isCollapsed ? "rotate(-90deg)" : "none" }} />
                <span className="text-white text-[13px] font-bold leading-snug">
                  Module {m.numeral}: {m.title}
                </span>
              </button>
              {!isCollapsed && (
                <nav className="space-y-1 pl-1">
                  {m.topics.map((t, ti) => {
                    const Icon = t.icon;
                    const isActive = t.id === activeId;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setActiveId(t.id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] font-medium text-left transition-colors"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.14)" : "transparent",
                          color: isActive ? "white" : "rgba(255,255,255,0.65)",
                        }}
                      >
                        <Icon size={14} className="shrink-0" />
                        <span className="flex-1 leading-snug">{parseInt(m.numeral, 10)}.{ti + 1} {t.title}</span>
                        {t.diagram && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
                            style={{ background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)", color: "white" }}>
                            DIAGRAM
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>
          );
        })}
      </aside>

      <main className="flex-1 px-12 py-10 max-w-4xl overflow-y-auto">
        <p className="text-[12.5px] font-extrabold uppercase tracking-widest mb-2" style={{ color: ACCENT_RED }}>
          Module {active.moduleNumeral} · Topic {active.numbering}
        </p>
        <h1 className="text-[26px] font-extrabold mb-3" style={{ color: INK }}>{active.title}</h1>
        <div className="w-14 h-1 mb-8" style={{ background: ACCENT_RED }} />

        <div className="space-y-7">
          {active.intro && <Intro text={active.intro} />}

          {DiagramComponent && (
            <div>
              <div className="rounded-xl p-6" style={{ background: "white", border: "1px solid #ECECEC" }}>
                <DiagramComponent />
              </div>
              <p className="text-[12.5px] text-slate-500 italic mt-2 max-w-2xl">{diagram.caption}</p>
            </div>
          )}

          {active.twoColumn && (
            <div className="rounded-xl p-6" style={{ background: GRAY_LIGHT }}>
              <TwoColumn {...active.twoColumn} />
            </div>
          )}

          {active.roleCards && <RoleCards cards={active.roleCards} />}
          {active.moduleCards && <ModuleCards cards={active.moduleCards} />}

          {active.fileTree && <FileTree {...active.fileTree} />}
          {active.fileReference && <FileReference items={active.fileReference} />}
          {active.codeBlock && <CodeBlock {...active.codeBlock} />}

          {active.bullets && (
            <div className="rounded-xl p-6" style={{ background: active.diagram || active.twoColumn || active.moduleCards || active.fileTree ? "white" : RED_TINT, border: active.diagram || active.twoColumn || active.moduleCards || active.fileTree ? "1px solid #ECECEC" : `1px solid ${RED_TINT_LINE}` }}>
              <Bullets items={active.bullets} />
            </div>
          )}

          {active.pillGroups && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {active.pillGroups.map((g, i) => <PillGroup key={i} {...g} />)}
            </div>
          )}

          {active.steps && (
            <div className="rounded-xl p-6 bg-white" style={{ border: "1px solid #ECECEC" }}>
              <Steps {...active.steps} />
            </div>
          )}

          {active.callout && <Callout {...active.callout} />}
        </div>

        <div className="flex items-center justify-between mt-9">
          <button
            onClick={() => activeIndex > 0 && setActiveId(FLAT_TOPICS[activeIndex - 1].id)}
            disabled={activeIndex === 0}
            className="text-[13px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: RED_DARK }}
          >
            ← Previous Topic
          </button>
          <button
            onClick={() => activeIndex < FLAT_TOPICS.length - 1 && setActiveId(FLAT_TOPICS[activeIndex + 1].id)}
            disabled={activeIndex === FLAT_TOPICS.length - 1}
            className="flex items-center gap-1.5 text-[13px] font-semibold disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ color: RED_DARK }}
          >
            Next Topic <ChevronRight size={15} />
          </button>
        </div>
      </main>
    </div>
  );
}
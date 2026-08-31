export function HeroStage() {
  return <div className="hero-stage" aria-hidden="true">
    <div className="hero-tray">
      <article className="hero-cell hero-cell-list">
        <span className="hero-cell-label">List</span>
        <div className="hero-chips">
          <span className="hero-chip">全部</span>
          <span className="hero-chip">进行中</span>
          <span className="hero-chip">异常</span>
        </div>
        <div className="hero-rows">
          <span className="hero-cursor" />
          <Row name="订单" meta="128" />
          <Row name="库存" meta="48" />
          <Row name="客户" meta="36" />
          <Row name="发票" meta="9" />
        </div>
      </article>
      <article className="hero-cell hero-cell-overlay">
        <span className="hero-cell-label">Overlay</span>
        <div className="hero-detail">
          <span className="hero-avatar" />
          <span className="hero-line hero-line-lg" />
          <span className="hero-line" />
          <span className="hero-line hero-line-sm" />
          <span className="hero-detail-block" />
        </div>
      </article>
      <article className="hero-cell hero-cell-host">
        <span className="hero-cell-label">Host</span>
        <div className="hero-pulse" />
        <span className="hero-host-state">query → cancel</span>
      </article>
      <article className="hero-cell hero-cell-view">
        <span className="hero-cell-label">View</span>
        <div className="hero-code">
          <span /><span /><span /><span />
        </div>
      </article>
    </div>
  </div>
}

function Row({ name, meta }: { name: string; meta: string }) {
  return <div className="hero-row">
    <span className="hero-dot" />
    <span className="hero-row-name">{name}</span>
    <span className="hero-row-meta">{meta}</span>
  </div>
}

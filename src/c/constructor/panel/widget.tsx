

export function Panel__Widget(params: any) {
  return (
    <div className="widget px-3 mt-4">
      {params.title && <div className="mb-0">{params.title}</div>}
      <div className="widget__content">
        {params.children}
      </div>
    </div>
  )
}
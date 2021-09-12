export const Typography = ({ children, color = 'white', fontSize, fontWeight = 400 }) => {
    return <div style={{ fontFamily: 'Sora', color, fontSize, fontWeight }}>{children}</div>
}

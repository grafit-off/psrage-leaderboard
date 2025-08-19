import React from 'react'
import styles from './Skeleton.module.scss'
import { classNames } from '../../functions/classNames'

type Variant = 'text' | 'avatar' | 'card' | 'list-item'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: Variant
    lines?: number
    width?: string
    height?: string
    animate?: boolean
}


export default function Skeleton({
    variant = 'text',
    lines = 3,
    width,
    height,
    animate = true,
    className,
    ...rest
}: SkeletonProps) {
    const base = classNames(styles.base, animate ? styles.pulse : '')

    if (variant === 'avatar') {
        const style: React.CSSProperties = {}
        if (width) style.width = width
        if (height) style.height = height
        return <div aria-busy="true" className={classNames(base, styles.avatar, className)} style={style} {...rest} />
    }

    if (variant === 'list-item') {
        return (
            <div aria-busy="true" className={classNames(styles.listWrapper, className)} {...rest}>
                <div className={classNames(base, styles.avatarCircle)} />
                <div className={styles.listContent}>
                    <div className={classNames(base, styles.line, styles.short)} />
                    <div className={classNames(base, styles.line)} />
                </div>
            </div>
        )
    }

    if (variant === 'card') {
        return (
            <div aria-busy="true" className={classNames(styles.cardWrapper, className)} {...rest}>
                <div className={classNames(base, styles.header)} style={height ? { height } : undefined} />
                <div className={styles.body}>
                    {Array.from({ length: lines }).map((_, i) => (
                        <div key={i} className={classNames(base, styles.line, i === 0 ? styles.wide : '')} />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div aria-busy="true" className={classNames(styles.container, className)} {...rest}>
            {Array.from({ length: lines }).map((_, i) => (
                <div key={i} className={classNames(base, styles.line, i === lines - 1 && width ? styles.customWidth : '')} style={i === lines - 1 && width ? { width } : undefined} />
            ))}
        </div>
    )
}

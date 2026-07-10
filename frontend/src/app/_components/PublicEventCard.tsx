"use client";

import Link from "next/link";

type PublicEventCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  detailHref: string;
  live?: boolean;
};

export function PublicEventCard(props: PublicEventCardProps) {
  const { title, description, imageSrc, detailHref, live } = props;
  const initials = title.slice(0, 2).toUpperCase();
  const hasDesc = Boolean(description);

  return (
    <Link href={detailHref} className="hxEventCard">
      <div className="hxEventVisual">
        {imageSrc ? (
          <>
            <img src={imageSrc} alt={`${title} event banner`} className="hxEventImg" loading="lazy" />
            <span className="hxEventShine" aria-hidden />
          </>
        ) : (
          <div className="hxEventPh" aria-hidden>
            {initials}
          </div>
        )}
        {live ? <span className="hxEventLiveTag hxEventLiveTag--overlay">Live</span> : null}
      </div>
      <div className="hxEventCopy">
        <h3 className="hxEventTitle">{title}</h3>
        <p className={hasDesc ? "hxEventDesc" : "hxEventDesc hxEventDesc--empty"}>
          {hasDesc ? description : "No description yet"}
        </p>
        <span className="hxEventGo">View event</span>
      </div>
    </Link>
  );
}

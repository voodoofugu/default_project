interface LoadingProps {
  noBG?: boolean;
}

const RotatingBlock = ({ rotate }: { rotate: string }) => (
  <div className={`absolute w-full h-full rotate-[${rotate}]`}>
    <div className="absolute w-full h-full rounded-full border-solid border-t-[2px] border-s-gray-200 border-e-bg-indigo-100 animate-rotate-one before:absolute before:bottom-[-3px] before:left-1/2 before:-translate-x-1/2 before:w-[12px] before:h-[4px] before:bg-white before:rounded-full"></div>
  </div>
);

export default function Loading({ noBG = false }: LoadingProps) {
  return (
    <div>
      {!noBG && (
        <div className="absolute left-0 top-0 w-full h-full bg-blurBg backdrop-blur"></div>
      )}
      <div className="absolute top-1/2 left-1/2 w-[64px] h-[64px] rounded-full perspective-[800px] drop-shadow-loader animate-rotateLoad before:absolute before:left-1/2 before:top-1/2 before:-translate-x-2/4 before:-translate-y-2/4 before:w-[20%] before:h-[20%] before:rounded-full before:bg-white before:animate-ripple after:absolute after:left-1/2 after:top-1/2 after:-translate-x-2/4 after:-translate-y-2/4 after:w-[20%] after:h-[20%] after:rounded-full after:bg-white after:animate-ripple-delay">
        <RotatingBlock rotate="0deg" />
        <RotatingBlock rotate="120deg" />
        <RotatingBlock rotate="240deg" />
      </div>
    </div>
  );
}

const WelcomeText = async ({ name }: { name: string }) => {
  return (
    <div className='space-x-1 text-4xl'>
      <span className='font-extrabold'>Hello</span>
      <span className='font-extrabold'>,</span>
      <span className='font-extrabold capitalize'>{name}.</span>
      <div className='text-muted-foreground text-2xl font-bold'>
        <h2>Make the most out of today!</h2>
      </div>
    </div>
  );
};

export default WelcomeText;

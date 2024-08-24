import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from '@nextui-org/react';

export default function CardRound() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    //   <Card
    //     key={group.roundGroupId}
    //     className="max-w-[610px] bg-white m-2 rounded-lg text-black"
    //   >
    //     <CardHeader>
    //       <div className="flex flex-col">
    //         <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
    //           {group.name}
    //         </span>
    //         <span>{group.coin}</span>
    //       </div>
    //     </CardHeader>
    //     <Divider />
    //     <CardBody>
    //       <span>Amount: {group.amount}</span>
    //       <span>Members: {group.numberOfMembers}</span>
    //       <span>Frequency: {group.frequency}</span>
    //       <span>Start Date: {group.startDate}</span>
    //       <span>Type: {group.type}</span>
    //       <span>Status: {group.status}</span>
    //     </CardBody>
    //     <Divider />
    //     <CardFooter>
    //       <Link
    //         isExternal
    //         showAnchorIcon
    //         href={`https://example.com/${group.roundGroupId}`} // Ajusta el enlace según sea necesario
    //       >
    //         View Details
    //       </Link>
    //     </CardFooter>
    //   </Card>
    <Card className="max-w-[340px] bg-white">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://nextui.org/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              Zoey Lang
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @zoeylang
            </h5>
          </div>
        </div>
        <Button
          className={
            isFollowed
              ? 'bg-transparent text-foreground border-default-200'
              : ''
          }
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? 'bordered' : 'solid'}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? 'Unfollow' : 'Follow'}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding
          adventure!
        </p>
        <span className="pt-2">
          #FrontendWithZoey
          <span className="py-2" aria-label="computer" role="img">
            💻
          </span>
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">4</p>
          <p className=" text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">97.1K</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  DollarSign,
  Instagram,
  Twitter,
  Youtube,
  CheckCircle,
  ArrowRight,
  Users,
  FileText,
} from "lucide-react";

interface Contract {
  id: string;
  brandName: string;
  influencerName: string;
  dealPrice: number;
  commissionRate: number;
  commissionAmount: number;
  status: string;
  createdAt: Date;
}

interface CreateContractDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onContractCreated?: (contract: Contract) => void;
}

export default function CreateContractDialog({
  open = true,
  onOpenChange = () => {},
  onContractCreated = () => {},
}: CreateContractDialogProps) {
  const [step, setStep] = useState(1);
  const [commissionRate, setCommissionRate] = useState([20]);
  const [dealPrice, setDealPrice] = useState("10000");
  const [brandName, setBrandName] = useState("TechCorp");
  const [influencerName, setInfluencerName] = useState("@fashionista_jane");
  const [stripeConnected, setStripeConnected] = useState(false);
  const [paypalConnected, setPaypalConnected] = useState(false);
  const [socialsConnected, setSocialsConnected] = useState(false);

  const totalSteps = 4;
  const commissionAmount = (parseFloat(dealPrice) * commissionRate[0]) / 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    // Create contract object
    const newContract: Contract = {
      id: `contract-${Date.now()}`,
      brandName,
      influencerName,
      dealPrice: parseFloat(dealPrice),
      commissionRate: commissionRate[0],
      commissionAmount,
      status: "Active",
      createdAt: new Date(),
    };

    // Pass contract to parent
    onContractCreated(newContract);

    // Close dialog and reset
    onOpenChange(false);
    setStep(1);
  };

  const connectStripe = () => {
    setStripeConnected(true);
    setTimeout(() => alert("Stripe connected! (Demo)"), 500);
  };

  const connectPaypal = () => {
    setPaypalConnected(true);
    setTimeout(() => alert("PayPal connected! (Demo)"), 500);
  };

  const connectSocials = () => {
    setSocialsConnected(true);
    setTimeout(() => alert("Social accounts connected! (Demo)"), 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create New Contract
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Step {step} of {totalSteps}: Set up a commission-based partnership
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step 1: Party Details */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Contract Parties
              </h3>
              <p className="text-gray-600">
                Define the brand and influencer for this partnership
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-800">Brand</CardTitle>
                  <CardDescription>The company or business</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="mt-1"
                  />
                </CardContent>
              </Card>

              <Card className="bg-purple-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-purple-800">Influencer</CardTitle>
                  <CardDescription>The content creator</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="influencerName">Influencer Handle</Label>
                  <Input
                    id="influencerName"
                    value={influencerName}
                    onChange={(e) => setInfluencerName(e.target.value)}
                    className="mt-1"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 2: Commission Structure */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Commission Structure
              </h3>
              <p className="text-gray-600">
                Set the commission rate and deal value
              </p>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Deal Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="dealPrice">Total Deal Value ($)</Label>
                  <Input
                    id="dealPrice"
                    type="number"
                    value={dealPrice}
                    onChange={(e) => setDealPrice(e.target.value)}
                    className="mt-1 text-lg font-semibold"
                  />
                </div>

                <Separator />

                <div>
                  <Label>Commission Rate: {commissionRate[0]}%</Label>
                  <Slider
                    value={commissionRate}
                    onValueChange={setCommissionRate}
                    max={50}
                    min={1}
                    step={1}
                    className="mt-3"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>1%</span>
                    <span>50%</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Commission Amount:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${commissionAmount.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {commissionRate[0]}% of $
                    {parseFloat(dealPrice).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Payment Integration */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Payment Integration
              </h3>
              <p className="text-gray-600">
                Connect your payment processors (Demo Mode)
              </p>
            </div>

            <div className="space-y-4">
              <Card
                className={`border-2 ${stripeConnected ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
                        <CreditCard className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Stripe</h4>
                        <p className="text-sm text-gray-600">
                          Credit card processing
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={connectStripe}
                      variant={stripeConnected ? "secondary" : "default"}
                      disabled={stripeConnected}
                    >
                      {stripeConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connected
                        </>
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border-2 ${paypalConnected ? "border-green-500 bg-green-50" : "border-gray-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">PayPal</h4>
                        <p className="text-sm text-gray-600">
                          Digital wallet payments
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={connectPaypal}
                      variant={paypalConnected ? "secondary" : "default"}
                      disabled={paypalConnected}
                    >
                      {paypalConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Connected
                        </>
                      ) : (
                        "Connect"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 4: Social Media Integration */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Instagram className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-gray-900">
                Social Media Integration
              </h3>
              <p className="text-gray-600">
                Connect social platforms for tracking (Demo Mode)
              </p>
            </div>

            <Card
              className={`border-2 ${socialsConnected ? "border-green-500 bg-green-50" : "border-gray-200"}`}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-lg">Social Platforms</h4>
                    <Button
                      onClick={connectSocials}
                      variant={socialsConnected ? "secondary" : "default"}
                      disabled={socialsConnected}
                    >
                      {socialsConnected ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          All Connected
                        </>
                      ) : (
                        "Connect All"
                      )}
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                      <Instagram className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm font-medium">Instagram</span>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-blue-500 text-white">
                      <Twitter className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm font-medium">Twitter</span>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-red-600 text-white">
                      <Youtube className="h-6 w-6 mx-auto mb-1" />
                      <span className="text-sm font-medium">YouTube</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contract Summary */}
            <Card className="bg-gray-50 border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Contract Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Brand:</span>
                    <span className="font-medium">{brandName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Influencer:</span>
                    <span className="font-medium">{influencerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deal Value:</span>
                    <span className="font-medium">
                      ${parseFloat(dealPrice).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commission Rate:</span>
                    <span className="font-medium">{commissionRate[0]}%</span>
                  </div>
                  <div className="flex justify-between font-semibold text-green-600">
                    <span>Commission Amount:</span>
                    <span>${commissionAmount.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button onClick={prevStep} variant="outline" disabled={step === 1}>
            Previous
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={nextStep}
              className="bg-green-600 hover:bg-green-700"
            >
              Next <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              className="bg-green-600 hover:bg-green-700"
            >
              Create Contract <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
